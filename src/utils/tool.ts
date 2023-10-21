import {FileEntry, readDir} from "@tauri-apps/api/fs";


export const getSuffix = (name: string) => name.split('.').pop() || ''

const supportFilter = (x: FileEntry) => ['jpg', 'png', 'jpeg'].includes(getSuffix(x.name || ''))

export const getMangaPageList = async (path: string) => {
  const fileList = await readDir(path, { recursive: false })

  return fileList.filter(supportFilter)
}

export const getMangaCover = async (path: string) => {
  const fileList = await readDir(path, { recursive: false })

  return fileList.find(supportFilter)
}
