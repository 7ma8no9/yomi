import {useAtom} from "jotai";
import {open} from "@tauri-apps/api/dialog";
import {invoke} from "@tauri-apps/api";

import {mangaListAtom} from "@pages/Library/store.ts";
import {toast} from "react-toastify";

export const useLibrary = () => {
  const [mangaList, refreshMangaList] = useAtom(mangaListAtom)

  const isEmpty = mangaList.length === 0

  const handleAddManga = async () => {
    const path = await open({
      title: 'Select a manga folder',
      directory: true,
      multiple: false,
    }) as string

    const success = await invoke('add_manga', { path })

    if (!success) {
      toast.error('Something went wrong while adding the manga')
    } else {
      toast.success('Manga added successfully')
    }

    refreshMangaList()
  }

  return {
    isEmpty,
    mangaList,
    handleAddManga,
  }
}
