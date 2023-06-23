import React from 'react'
import {Container, Dialog} from "@mui/material";
import {useAtom} from "jotai";
import {currentMangaAtom} from "./store";
import ScrollReader from "@components/ScrollReader";

const Reader: React.FC = () => {
  const [currentManga, setCurrentManga] = useAtom(currentMangaAtom)
  const open = Boolean(currentManga)

  return (
    <Dialog
      open={open} onClose={() => setCurrentManga(null)}
      fullScreen
    >
      {
        currentManga ? (
          <ScrollReader {...currentManga} />
        ) : null
      }
    </Dialog>
  )
}

export default Reader
