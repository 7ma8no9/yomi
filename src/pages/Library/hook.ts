import {useAtomValue, useSetAtom} from "jotai";
import {currentMangaAtom, mangaListAtom} from "./store";
import { open } from '@tauri-apps/api/dialog'
import {invoke} from "@tauri-apps/api";

export const useAddManga = () => {
  const refreshMangaList = useSetAtom(mangaListAtom)

  return async () => {
    const path = await open({
      title: '选择漫画文件夹',
      directory: true,
      multiple: false
    }) as string

    const success = await invoke('add_manga', { path })

    if (!success) console.error('cannot create manga')

    refreshMangaList()
  }
}

export const useLibrary = () => {
  const mangaList = useAtomValue(mangaListAtom)
  const setCurrentManga = useSetAtom(currentMangaAtom)

  const handleClick = (manga: Manga.Instance) => setCurrentManga(manga)

  return {
    mangaList,
    handleClick,
  }
}