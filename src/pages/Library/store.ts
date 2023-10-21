import { invoke } from "@tauri-apps/api";
import {atomWithRefresh} from "@utils/atomCreators.ts";

export const mangaListAtom = atomWithRefresh<Promise<Manga.Instance[]>>(async () =>
  await invoke("get_mangas") as Array<Manga.Instance>
)
