use serde::{Deserialize, Serialize};
use std::fs;
use std::path::PathBuf;

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct TaskData {
    pub tasks: String,
}

fn get_todo_path() -> PathBuf {
    let data_dir = dirs::data_dir()
        .unwrap_or_else(|| PathBuf::from("."))
        .join("todotext");
    fs::create_dir_all(&data_dir).ok();
    data_dir.join("todo.txt")
}

#[tauri::command]
fn load_tasks() -> Result<String, String> {
    let path = get_todo_path();
    if path.exists() {
        fs::read_to_string(&path).map_err(|e| e.to_string())
    } else {
        Ok(String::new())
    }
}

#[tauri::command]
fn save_tasks(content: String) -> Result<(), String> {
    let path = get_todo_path();
    fs::write(&path, &content).map_err(|e| e.to_string())
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_store::Builder::new().build())
        .plugin(tauri_plugin_shell::init())
        .invoke_handler(tauri::generate_handler![load_tasks, save_tasks])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
