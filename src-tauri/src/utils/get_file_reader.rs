use crate::file_reader::{FileReader, FolderReader, RarReader, ZipReader};
use std::path::Path;

pub fn get_file_reader(path: &Path) -> Result<Box<dyn FileReader>, String> {
    if !path.exists() {
        return Err(format!("{} does not exist", path.display()));
    }

    if path.is_dir() {
        return Ok(Box::new(FolderReader));
    }

    let extension = path.extension().and_then(|ext| ext.to_str()).unwrap_or("");

    match extension {
        "zip" | "cbz" => Ok(Box::new(ZipReader)),
        "rar" | "cbr" => Ok(Box::new(RarReader)),
        _ => Err(format!("Unsupported file extension: {}", extension)),
    }
}
