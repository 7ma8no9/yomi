import {readDir} from "@tauri-apps/api/fs";

export const getSuffix = (name: string) => {
  const parts = name.split('.')

  return parts[parts.length - 1]
}

export const readMangaList = async (path: string) => {
  const fileList = await readDir(path, { recursive: false })

  return fileList.filter(x => ['png', 'jpeg', 'jpg'].includes(getSuffix(x.name || '')))
}