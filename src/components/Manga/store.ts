import {atom} from "jotai";
import {FileEntry, readDir} from "@tauri-apps/api/fs";
import {getSuffix} from "../../utils/tool";
import {convertFileSrc} from "@tauri-apps/api/tauri";

export const mangaAtom = atom<Manga.Instance | null>(null)

export const pageListAtom = atom(
  async (get) => {
    const { path } = get(mangaAtom) || {}
    if (!path) return []
    return await readDir(path, { recursive: false })
  }
)

export const coverAtom = atom(async (get) => {
  const fileList = await get(pageListAtom)
  const cover = fileList.find(x => ['png', 'jpg', 'jpeg'].includes(getSuffix(x.name || '')))

  if (!cover?.path) return undefined

  return convertFileSrc(cover.path)
})