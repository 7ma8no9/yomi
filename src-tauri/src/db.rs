use dirs;
use std::fs;
use std::path::Path;

use rusqlite::{Connection, Result};

const DB_PATH: &'static str = ".config/yomi/db.sqlite";

pub fn connect() -> Result<Connection> {
    if !db_file_exists() {
        create_db_file();
    }

    Connection::open(get_db_path())
}

fn create_db_file() {
    let db_path = get_db_path();
    let db_dir = Path::new(&db_path).parent().unwrap();

    if !db_dir.exists() {
        fs::create_dir_all(db_dir).unwrap();
    }

    fs::File::create(db_path).unwrap();
}

fn db_file_exists() -> bool {
    let db_path = get_db_path();
    Path::new(&db_path).exists()
}

fn get_db_path() -> String {
    let home_dir = dirs::home_dir().unwrap();
    home_dir.to_str().unwrap().to_string() + "/" + DB_PATH
}
