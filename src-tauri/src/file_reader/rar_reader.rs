use super::FileReader;
use std::path::Path;
use unrar::Archive;

pub struct RarReader;

impl FileReader for RarReader {
    fn read_directory(&self, path: &Path) -> Result<Vec<String>, String> {
        let mut file_names = Vec::new();

        for entry in Archive::new(path)
            .open_for_listing()
            .map_err(|e| format!("{:?}", e))?
        {
            let entry = entry.map_err(|e| format!("{:?}", e))?;
            let filename = match entry.filename.to_str() {
                Some(name) => name,
                None => {
                    return Err(std::io::Error::new(
                        std::io::ErrorKind::InvalidData,
                        "invalid filename",
                    )
                    .to_string())
                }
            }
            .to_string();
            file_names.push(filename);
        }

        Ok(file_names)
    }

    fn read_file(&self, path: &Path, file_name: &str) -> Result<Vec<u8>, String> {
        let mut archive = Archive::new(path)
            .open_for_processing()
            .map_err(|e| format!("Failed to open archive: {:?}", e))?;

        while let Some(entry) = archive
            .read_header()
            .map_err(|e| format!("Failed to read header: {}", e))?
        {
            // 检查当前条目是否是指定的文件
            if entry.entry().filename.to_string_lossy() == file_name {
                // 提取文件内容
                let buffer = entry
                    .read()
                    .map_err(|e| format!("Failed to read entry: {}", e))?
                    .0;
                return Ok(buffer);
            }
            // 跳过当前条目（如果不是目标文件）
            archive = entry
                .skip()
                .map_err(|e| format!("Failed to skip entry: {}", e))?;
        }

        // 如果未找到文件，返回错误
        Err(format!("File '{}' not found in archive", file_name))
    }
}
