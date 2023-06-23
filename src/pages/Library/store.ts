import {atom} from 'jotai'
import {invoke} from "@tauri-apps/api";

const flagAtom = atom<boolean>(false)
export const mangaListAtom = atom(async (get) => {
  get(flagAtom)
  return await invoke('get_mangas') as Array<Manga.Instance>
})

export const currentMangaAtom = atom<Manga.Instance | null>(null)

export const refreshMangaListAtom = atom(
  null,
  (_, set) => {
    set(flagAtom, f => !f)
  }
)
