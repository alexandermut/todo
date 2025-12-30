use wasm_bindgen::prelude::*;
use serde::{Serialize, Deserialize};
use std::collections::HashMap;
use chrono::{NaiveDate, Duration, Datelike};

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
    pub tags: Vec<String>,
    pub metadata: HashMap<String, String>,
    pub due: Option<String>,
}

#[wasm_bindgen]
pub fn parse_todo_line(line: &str) -> JsValue {
    let raw = line.trim();
    let remaining_str = raw.to_string(); // Keep ownership for manipulation if needed, but we slice mostly
    let mut remaining = remaining_str.as_str();
    
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
        tags: Vec::new(),
        metadata: HashMap::new(),
        due: None,
    };

    if raw.is_empty() {
        return serde_wasm_bindgen::to_value(&task).unwrap();
    }

    // 1. Completed
    if remaining.starts_with("x ") {
        task.completed = true;
        remaining = &remaining[2..];
        
        // Check for completion date
        if let Some(date) = parse_iso_date(remaining) {
            task.completion_date = Some(date.to_string());
            remaining = remaining[date.len()..].trim();
        }
    }

    // 2. Priority
    if remaining.starts_with("(") {
        // Simple manual check or regex
        if let Some(captures) = regex::Regex::new(r"^\(([A-Z])\)\s").unwrap().find(remaining) {
            let p_str = &remaining[1..2];
            task.priority = Some(p_str.to_string());
            remaining = &remaining[captures.end()..];
        }
    }

    // 3. Creation Date
    if let Some(date) = parse_iso_date(remaining) {
        task.creation_date = Some(date.to_string());
        remaining = remaining[date.len()..].trim();
    }

    // 4. Projects, Contexts, Metadata
    // We assume these can be anywhere in the text, so we scan the *remaining* part (which is the description)
    // "remaining" now holds the description primarily, but standard todo.txt says tags are part of description.
    
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

    let re_tag = regex::Regex::new(r"#([\w.-]+)").unwrap();
    for cap in re_tag.captures_iter(remaining) {
        if !task.tags.contains(&cap[1].to_string()) {
            task.tags.push(cap[1].to_string());
        }
    }

    // Get current date for smart parsing
    let today = get_current_date();

    let re_meta = regex::Regex::new(r"(\w+):(\S+)").unwrap();
    for cap in re_meta.captures_iter(remaining) {
        let key = cap[1].to_string();
        let val = cap[2].to_string();
        
        // Special handling for 'due'
        if key == "due" {
            // Try smart parsing
            if let Some(parsed_date) = parse_smart_date(&val, today) {
                task.due = Some(parsed_date.format("%Y-%m-%d").to_string());
            } else {
                // Fallback: just store what we found? 
                // Or maybe we still store it in metadata?
                // For now, if we can't parse it, we don't set 'due' field (or set raw?)
                // Let's set it if it looks like a date, but smart parse handles that.
            }
        }

        task.metadata.insert(key, val);
    }

    task.text = remaining.to_string();

    serde_wasm_bindgen::to_value(&task).unwrap()
}

fn parse_iso_date(s: &str) -> Option<&str> {
    let re = regex::Regex::new(r"^\d{4}-\d{2}-\d{2}").unwrap();
    re.find(s).map(|m| m.as_str())
}

fn parse_smart_date(s: &str, reference_date: NaiveDate) -> Option<NaiveDate> {
    let lower = s.to_lowercase();

    // 1. ISO Date: YYYY-MM-DD
    if let Ok(date) = NaiveDate::parse_from_str(s, "%Y-%m-%d") {
        return Some(date);
    }

    // 2. German Date: DD.MM.YYYY
    if let Ok(date) = NaiveDate::parse_from_str(s, "%d.%m.%Y") {
        return Some(date);
    }

    // 3. German Short: DD.MM.YY
    if let Ok(date) = NaiveDate::parse_from_str(s, "%d.%m.%y") {
        return Some(date);
    }

    // 4. Relative words
    match lower.as_str() {
        "today" | "heute" => return Some(reference_date),
        "tomorrow" | "morgen" => return Some(reference_date + Duration::days(1)),
        "overmorrow" | "übermorgen" => return Some(reference_date + Duration::days(2)),
        // "yesterday" | "gestern" => return Some(reference_date - Duration::days(1)), // Rarely used for due dates
        _ => {}
    }

    // 5. Weekdays (next occurrence)
    // "montag", "monday", "mo", "mon"
    let weekdays = vec![
        ("monday", chrono::Weekday::Mon), ("montag", chrono::Weekday::Mon), ("mo", chrono::Weekday::Mon),
        ("tuesday", chrono::Weekday::Tue), ("dienstag", chrono::Weekday::Tue), ("di", chrono::Weekday::Tue),
        ("wednesday", chrono::Weekday::Wed), ("mittwoch", chrono::Weekday::Wed), ("mi", chrono::Weekday::Wed),
        ("thursday", chrono::Weekday::Thu), ("donnerstag", chrono::Weekday::Thu), ("do", chrono::Weekday::Thu),
        ("friday", chrono::Weekday::Fri), ("freitag", chrono::Weekday::Fri), ("fr", chrono::Weekday::Fri),
        ("saturday", chrono::Weekday::Sat), ("samstag", chrono::Weekday::Sat), ("sa", chrono::Weekday::Sat),
        ("sunday", chrono::Weekday::Sun), ("sonntag", chrono::Weekday::Sun), ("so", chrono::Weekday::Sun),
    ];

    for (name, weekday) in weekdays {
        if lower == name {
            let mut date = reference_date + Duration::days(1);
            while date.weekday() != weekday {
                date += Duration::days(1);
            }
            return Some(date);
        }
    }

    None
}

fn get_current_date() -> NaiveDate {
    // Use js_sys to get browser's current local date
    let date = js_sys::Date::new_0();
    let year = date.get_full_year() as i32;
    let month = date.get_month() as u32 + 1; // JS months are 0-11
    let day = date.get_date() as u32;

    NaiveDate::from_ymd_opt(year, month, day).unwrap_or_else(|| NaiveDate::from_ymd_opt(2024, 1, 1).unwrap())
}

#[derive(Serialize)]
pub struct DateAlias {
    pub name: String,
    pub value: String,
    pub description: String,
}

#[derive(Serialize)]
pub struct Completion {
    pub id: String,
    pub display: String,
    pub value: String,
    pub category: String, // "project", "context", "tag", "date"
}

#[wasm_bindgen]
pub fn get_completions(
    line: &str,
    cursor_pos: usize,
    projects: Vec<String>,
    contexts: Vec<String>,
    tags: Vec<String>
) -> JsValue {
    let (start, end) = find_token_bounds(line, cursor_pos);
    if start == end {
        return JsValue::NULL;
    }

    let token = &line[start..end];
    let mut suggestions = Vec::new();

    if token.starts_with('+') {
        let query = &token[1..].to_lowercase();
        for proj in projects {
            if proj.to_lowercase().contains(query) {
                suggestions.push(Completion {
                    id: format!("p_{}", proj),
                    display: format!("+{}", proj),
                    value: proj,
                    category: "project".to_string(),
                });
            }
        }
    } else if token.starts_with('@') {
        let query = &token[1..].to_lowercase();
        for ctx in contexts {
            if ctx.to_lowercase().contains(query) {
                suggestions.push(Completion {
                    id: format!("c_{}", ctx),
                    display: format!("@{}", ctx),
                    value: ctx,
                    category: "context".to_string(),
                });
            }
        }
    } else if token.starts_with('#') {
        let query = &token[1..].to_lowercase();
        for tag in tags {
            if tag.to_lowercase().contains(query) {
                suggestions.push(Completion {
                    id: format!("t_{}", tag),
                    display: format!("#{}", tag),
                    value: tag,
                    category: "tag".to_string(),
                });
            }
        }
    } else if token.starts_with("due:") {
        let query = &token[4..];
        let aliases_js = get_date_aliases(query);
        // Deserialize back from JsValue is expensive/tricky inside same module without helper,
        // but we can call internal logic if refactored.
        // For simplicity now, let's just duplicate the internal call or rely on common logic.
        // Let's refactor get_date_aliases to share logic.
        let aliases = internal_get_date_aliases(query);
        for a in aliases {
            suggestions.push(Completion {
                id: a.name.clone(),
                display: a.name.clone(),
                value: a.value,
                category: "date".to_string(),
            });
        }
    }

    serde_wasm_bindgen::to_value(&suggestions).unwrap()
}

fn find_token_bounds(line: &str, cursor: usize) -> (usize, usize) {
    let chars: Vec<char> = line.chars().collect();
    if cursor > chars.len() {
        return (0, 0);
    }

    // Find start (look back for space)
    let mut start = cursor;
    while start > 0 && chars[start - 1] != ' ' {
        start -= 1;
    }

    // Find end (look forward for space)
    let mut end = cursor;
    while end < chars.len() && chars[end] != ' ' {
        end += 1;
    }

    (start, end)
}

#[wasm_bindgen]
pub fn get_date_aliases(query: &str) -> JsValue {
    let aliases = internal_get_date_aliases(query);
    serde_wasm_bindgen::to_value(&aliases).unwrap()
}
        ("today", today, "Current date"),
        ("heute", today, "Heutiges Datum"),
        ("tomorrow", today + Duration::days(1), "Next day"),
        ("morgen", today + Duration::days(1), "Morgen"),
        ("overmorrow", today + Duration::days(2), "The day after tomorrow"),
        ("übermorgen", today + Duration::days(2), "Übermorgen"),
    ];

    for (name, date, desc) in basics {
        if name.starts_with(&lower) {
            aliases.push(DateAlias {
                name: name.to_string(),
                value: date.format("%Y-%m-%d").to_string(),
                description: desc.to_string(),
            });
        }
    }

    let weekdays = vec![
        ("monday", chrono::Weekday::Mon), ("montag", chrono::Weekday::Mon),
        ("tuesday", chrono::Weekday::Tue), ("dienstag", chrono::Weekday::Tue),
        ("wednesday", chrono::Weekday::Wed), ("mittwoch", chrono::Weekday::Wed),
        ("thursday", chrono::Weekday::Thu), ("donnerstag", chrono::Weekday::Thu),
        ("friday", chrono::Weekday::Fri), ("freitag", chrono::Weekday::Fri),
        ("saturday", chrono::Weekday::Sat), ("samstag", chrono::Weekday::Sat),
        ("sunday", chrono::Weekday::Sun), ("sonntag", chrono::Weekday::Sun),
    ];

    for (name, weekday) in weekdays {
        if name.starts_with(&lower) {
            let mut date = today + Duration::days(1);
            while date.weekday() != weekday {
                date += Duration::days(1);
            }
            aliases.push(DateAlias {
                name: name.to_string(),
                value: date.format("%Y-%m-%d").to_string(),
                description: format!("Next {}", name),
            });
        }
    }
    aliases
}

fn generate_id() -> String {
    let rand_val = js_sys::Math::random();
    format!("{}-{}", js_sys::Date::now() as u64, (rand_val * 1000000.0) as u64)
}
