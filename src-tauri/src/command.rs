use crate::manga::Manga;
use crate::yomi::YomiState;
use tauri::State;

#[tauri::command]
pub fn get_mangas(state: State<YomiState>) -> Vec<Manga> {
    let yomi = state.yomi.lock().unwrap();
    let manga = yomi.get_mangas().unwrap();

    manga
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