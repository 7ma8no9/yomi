use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Debug)]
pub struct Manga {
    pub id: i32,
    pub name: String,
    pub path: String,
    pub invalid: bool,
}

impl Manga {}
