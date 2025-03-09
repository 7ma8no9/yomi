use super::FileReader;
use std::fs;
use std::fs::File;
use std::io::Read;
use std::path::Path;

pub struct FolderReader;

impl FileReader for FolderReader {
    fn read_directory(&self, path: &Path) -> Result<Vec<String>, String> {
        let mut file_names = Vec::new();
        let dir_path = Path::new(path);

        if !dir_path.exists() {
            return Err(std::io::Error::new(
                std::io::ErrorKind::InvalidInput,
                "Provided path is not exists",
            )
            .to_string());
        }

        if !dir_path.is_dir() {
            return Err(std::io::Error::new(
                std::io::ErrorKind::InvalidInput,
                "Provided path is not a folder",
            )
            .to_string());
        }

        for entry in fs::read_dir(dir_path).map_err(|e| e.to_string())? {
            let entry = entry.map_err(|e| e.to_string())?;
            let file_name = entry.file_name().into_string().unwrap_or_default();
            file_names.push(file_name);
        }

        Ok(file_names)
    }

    fn read_file(&self, path: &Path, file_name: &str) -> Result<Vec<u8>, String> {
        let file_path = Path::new(path).join(file_name);

        if !file_path.exists() {
            return Err(std::io::Error::new(
                std::io::ErrorKind::InvalidInput,
                "Provided path is not exists",
            )
            .to_string());
        }

        if !file_path.is_file() {
            return Err(std::io::Error::new(
                std::io::ErrorKind::InvalidInput,
                "Provided path is not a file",
            )
            .to_string());
        }

        let mut file = File::open(file_path).map_err(|e| e.to_string())?;
        let mut buffer = Vec::new();
        file.read_to_end(&mut buffer).map_err(|e| e.to_string())?;
        Ok(buffer)
    }
}
