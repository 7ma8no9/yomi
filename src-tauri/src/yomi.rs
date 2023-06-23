use crate::db;
use crate::manga::Manga;
use rusqlite::{Connection, params, Result};
use std::sync::Mutex;
use crate::utils::{get_filename_from_path, path_exist};

pub struct YomiState {
    pub yomi: Mutex<Yomi>,
}

impl YomiState {
    pub fn new() -> Result<YomiState> {
        let yomi = Yomi::new()?;
        let yomi = Mutex::from(yomi);
        Ok(YomiState { yomi })
    }
}

pub struct Yomi {
    pub conn: Connection,
}

impl Yomi {
    pub fn new() -> Result<Yomi> {
        let conn = db::connect()?;
        conn.execute(
            "CREATE TABLE IF NOT EXISTS Manga (
                    id          INTEGER         PRIMARY KEY,
                    name        text            NOT NULL,
                    path        text            NOT NULL,
                    invalid     numeric         DEFAULT 0
            )",
            [],
        )?;

        Ok(Yomi { conn })
    }

    pub fn get_mangas(&self) -> Result<Vec<Manga>> {
        let mut stmt = self.conn.prepare("SELECT * FROM Manga")?;
        let mangas_iter = stmt.query_map([], |row| {
            let invalid = row.get::<usize, i32>(3).unwrap() == 1;
            Ok(Manga {
                id: row.get(0)?,
                name: row.get(1)?,
                path: row.get(2)?,
                invalid,
            })
        })?;

        let mut mangas: Vec<Manga> = Vec::new();

        for manga in mangas_iter {
            mangas.push(manga?);
        }

        Ok(mangas)
    }

    pub fn new_manga(&self, path: &str) -> Result<(), &str> {
        let invalid = if path_exist(path) { 0 } else { 1 };
        let mut name = "";
        match get_filename_from_path(path) {
            Some(filename) => {
                if let Some(n) = filename.to_str() {
                    name = n;
                } else {
                    return Err("Failed to get filename")
                }
            },
            None => {
                return Err("Failed to get filename")
            }
        }

        let res = self.conn.execute(
            "INSERT INTO Manga (name, path, invalid) VALUES (?1, ?2, ?3)",
            params![name, path, &invalid]
        );

        if res.is_err() {
            return Err("Failed to insert manga")
        }

        Ok(())
    }
}
