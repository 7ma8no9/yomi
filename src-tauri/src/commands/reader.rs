use crate::utils::get_file_reader;
use std::path::Path;
use tauri::command;

#[command]
pub fn get_index(path: String) -> Result<Vec<String>, String> {
    let path = Path::new(&path);
    let reader = get_file_reader(path).map_err(|e| e.to_string())?;
    reader.read_directory(path).map_err(|e| e.to_string())
}

#[command]
pub fn read_content(path: String, file_name: String) -> Result<Vec<u8>, String> {
    let path = Path::new(&path);
    let reader = get_file_reader(path).map_err(|e| e.to_string())?;
    reader
        .read_file(path, &file_name)
        .map_err(|e| e.to_string())
}
