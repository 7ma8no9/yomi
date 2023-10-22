use tauri::State;

use crate::manga;
use crate::yomi::YomiState;
use log::trace;

#[tauri::command]
pub fn get_mangas(state: State<YomiState>) -> Vec<manga::Manga> {
    trace!("get mangas");
    let yomi = state.yomi.lock().unwrap();
    yomi.get_mangas().unwrap()
}

#[tauri::command]
pub fn add_manga(path: &str, state: State<YomiState>) -> bool {
    trace!("add manga, path: {}", path);
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
    trace!("get manga by id: {}", id);
    let yomi = state.yomi.lock().unwrap();
    yomi.get_manga_by_id(id).unwrap()
}


#[tauri::command]
pub fn remove_manga_by_id(id: i32, state: State<YomiState>) -> bool {
    trace!("remove manga by id: {}", id);
    let yomi = state.yomi.lock().unwrap();

    match yomi.remove_manga(id) {
        Ok(_) => true,
        Err(msg) => {
            println!("{msg}");
            false
        },
    }
}
