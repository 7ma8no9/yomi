use super::FileReader;
use std::fs::File;
use std::io::Read;
use std::path::Path;
use zip::read::ZipArchive;

pub struct ZipReader;

impl FileReader for ZipReader {
    fn read_directory(&self, path: &Path) -> Result<Vec<String>, String> {
        let file = File::open(path).map_err(|e| e.to_string())?;
        let mut archive = ZipArchive::new(file).map_err(|e| e.to_string())?;

        let mut file_names = Vec::new();

        for file_name in archive.file_names() {
            // remove folder name
            if file_name.ends_with("/") {
                continue;
            }
            file_names.push(file_name.to_string());
        }

        Ok(file_names)
    }

    fn read_file(&self, path: &Path, file_name: &str) -> Result<Vec<u8>, String> {
        let file = File::open(path).map_err(|e| e.to_string())?;
        let mut archive = ZipArchive::new(file).map_err(|e| e.to_string())?;

        let mut file = archive.by_name(file_name).map_err(|e| e.to_string())?;
        let mut buffer = Vec::new();
        file.read_to_end(&mut buffer).map_err(|e| e.to_string())?;

        Ok(buffer)
    }
}
