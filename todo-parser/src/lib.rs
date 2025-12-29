use wasm_bindgen::prelude::*;
use serde::{Serialize, Deserialize};
use std::collections::HashMap;

#[derive(Serialize, Deserialize)]
pub struct Task {
    pub id: String,
    pub raw: String,
    pub completed: bool,
    pub priority: Option<String>,
    #[serde(rename = "completionDate")]
    pub completion_date: Option<String>,
    #[serde(rename = "creationDate")]
    pub creation_date: Option<String>,
    pub text: String,
    pub projects: Vec<String>,
    pub contexts: Vec<String>,
    pub metadata: HashMap<String, String>,
}

#[wasm_bindgen]
pub fn parse_todo_line(line: &str) -> JsValue {
    let raw = line.trim();
    let mut remaining = raw;
    
    let mut task = Task {
        id: generate_id(),
        raw: raw.to_string(),
        completed: false,
        priority: None,
        completion_date: None,
        creation_date: None,
        text: String::new(),
        projects: Vec::new(),
        contexts: Vec::new(),
        metadata: HashMap::new(),
    };

    if raw.is_empty() {
        return serde_wasm_bindgen::to_value(&task).unwrap();
    }

    // 1. Completed
    if remaining.starts_with("x ") {
        task.completed = true;
        remaining = &remaining[2..];
        
        // Check for completion date
        if let Some(date) = parse_date(remaining) {
            task.completion_date = Some(date.to_string());
            remaining = remaining[date.len()..].trim();
        }
    }

    // 2. Priority
    if remaining.starts_with("(") {
        if let Some(captures) = regex::Regex::new(r"^\(([A-Z])\)\s").unwrap().find(remaining) {
            let p_str = &remaining[1..2];
            task.priority = Some(p_str.to_string());
            remaining = &remaining[captures.end()..];
        }
    }

    // 3. Creation Date
    if let Some(date) = parse_date(remaining) {
        task.creation_date = Some(date.to_string());
        remaining = remaining[date.len()..].trim();
    }

    // 4. Projects, Contexts, Metadata
    // Note: This regex-based extraction is a simplification. 
    // In a real parser we might iterate words to preserve position, but for compatible output structure:
    
    let re_project = regex::Regex::new(r"\+([\w.-]+)").unwrap();
    for cap in re_project.captures_iter(remaining) {
        if !task.projects.contains(&cap[1].to_string()) {
            task.projects.push(cap[1].to_string());
        }
    }

    let re_context = regex::Regex::new(r"@([\w.-]+)").unwrap();
    for cap in re_context.captures_iter(remaining) {
        if !task.contexts.contains(&cap[1].to_string()) {
            task.contexts.push(cap[1].to_string());
        }
    }

    let re_meta = regex::Regex::new(r"(\w+):([^\s]+)").unwrap();
    for cap in re_meta.captures_iter(remaining) {
        task.metadata.insert(cap[1].to_string(), cap[2].to_string());
    }

    task.text = remaining.to_string();

    serde_wasm_bindgen::to_value(&task).unwrap()
}

fn parse_date(s: &str) -> Option<&str> {
    let re = regex::Regex::new(r"^\d{4}-\d{2}-\d{2}").unwrap();
    re.find(s).map(|m| m.as_str())
}

fn generate_id() -> String {
    // Simple random ID generation for now
    let rand_val = js_sys::Math::random();
    format!("{}-{}", js_sys::Date::now() as u64, (rand_val * 1000000.0) as u64)
}

// Add regex dependency to Cargo.toml for this to work
