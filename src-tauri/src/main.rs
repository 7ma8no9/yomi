// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
mod command;
mod db;
mod manga;
mod yomi;
mod utils;

use yomi::YomiState;
use command::{get_mangas, add_manga};

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            get_mangas,
            add_manga,
        ])
        .manage(YomiState::new().unwrap())
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
