pub mod folder_reader;
pub mod rar_reader;
pub mod zip_reader;

use std::path::Path;

pub use folder_reader::FolderReader;
pub use rar_reader::RarReader;
pub use zip_reader::ZipReader;

pub trait FileReader {
    fn read_directory(&self, path: &Path) -> Result<Vec<String>, String>;
    fn read_file(&self, path: &Path, file_name: &str) -> Result<Vec<u8>, String>;
}

pub enum FileReaderType {
    ZipFile,
    RarFile,
    FolderFile,
}
