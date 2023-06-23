import {atom} from 'jotai'
import {invoke} from "@tauri-apps/api";
import {atomWithRefresh} from "@utils/atomCreators";

const flagAtom = atom<boolean>(false)
export const mangaListAtom = atomWithRefresh(async (get) => {
  get(flagAtom)
  return await invoke('get_mangas') as Array<Manga.Instance>
})

export const currentMangaAtom = atom<Manga.Instance | null>(null)
