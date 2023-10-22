// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod yomi;
mod db;
mod manga;
mod utils;
mod command;

use command::{get_mangas, add_manga, get_manga_by_id, remove_manga_by_id};
use yomi::YomiState;

#[macro_use]
extern crate log;


fn main() {
    env_logger::init();
    warn!("YOMI starting up");
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            get_mangas,
            add_manga,
            get_manga_by_id,
            remove_manga_by_id,
        ])
        .manage(YomiState::new().unwrap())
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
