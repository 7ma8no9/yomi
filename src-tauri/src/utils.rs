use std::ffi::OsStr;
use std::path::Path;

pub fn get_filename_from_path(path: &str) -> Option<&OsStr> {
    let path = Path::new(path);
    path.file_name()
}

pub fn path_exist(path: &str) -> bool {
    Path::new(path).exists()
}