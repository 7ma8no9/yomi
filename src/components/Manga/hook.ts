import React from "react";

import {useAtomValue, useSetAtom} from "jotai";
import {coverAtom, mangaAtom} from "./store";

export const useManga = (manga: Manga.Instance) => {
  const setManga = useSetAtom(mangaAtom)
  const cover = useAtomValue(coverAtom)

  React.useLayoutEffect(
    () => {
      setManga(manga)

      return () => {
        setManga(null)
      }
    },
    []
  )

  return {
    cover,
    name: manga.name
  }
}