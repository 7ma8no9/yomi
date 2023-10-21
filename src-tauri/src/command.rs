use tauri::State;

use crate::manga;
use crate::yomi::YomiState;

#[tauri::command]
pub fn get_mangas(state: State<YomiState>) -> Vec<manga::Manga> {
    let yomi = state.yomi.lock().unwrap();
    yomi.get_mangas().unwrap()
}

#[tauri::command]
pub fn add_manga(path: &str, state: State<YomiState>) -> bool {
    let yomi = state.yomi.lock().unwrap();

    match yomi.new_manga(path) {
        Ok(_) => true,
        Err(msg) => {
            println!("{msg}");
            false
        },
    }
}

#[tauri::command]
pub fn get_manga_by_id(id: i32, state: State<YomiState>) -> manga::Manga {
    let yomi = state.yomi.lock().unwrap();
    yomi.get_manga_by_id(id).unwrap()
}
