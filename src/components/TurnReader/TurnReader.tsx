import React from 'react'
import {FileEntry} from "@tauri-apps/api/fs";
import {readMangaList} from "@utils/tool";
import {Box, IconButton, styled} from "@mui/material";
import {convertFileSrc} from "@tauri-apps/api/tauri";
import SwapIcon from "@mui/icons-material/SwapHoriz";

const Img = styled('img')`
  object-fit: contain;
  height: 100%;
  max-width: 100%;
`

const Empty = styled('div')`
  height: 100%;
  width: 100%;
`

const useTurnReader = (manga: Manga.Instance) => {
  const [curIdx, setCurIdx] = React.useState<number>(0)
  const [fileList, setFileList] = React.useState<FileEntry[]>([])
  const swapRef = React.useRef<boolean>(false)

  const handleNext = () => {
    setCurIdx(x => {
      if (x < fileList.length - 2) {
        return x + 2
      } else {
        return x
      }
    })
  }

  const handlePrev = () => {
    setCurIdx(x => {
      if (x >= 1) {
        return x - 2
      } else {
        return x
      }
    })
  }

  const handleSwap = () => {
    if (swapRef.current) {
      if (curIdx < 0) return
      setCurIdx(x => x - 1)
      swapRef.current = false
    } else {
      if (curIdx >= fileList.length) return
      setCurIdx(x => x + 1)
      swapRef.current = true
    }
  }



  const leftPage = fileList[curIdx + 1]
  const rightPage = fileList[curIdx]

  React.useEffect(
    () => {
      readMangaList(manga.path).then(setFileList)
    },
    [manga]
  )

  // React.useEffect(
  //   () => {
  //     const keyBinding = (e: KeyboardEvent) => {
  //       if (e.key === 'ArrowRight') {
  //         handlePrev()
  //       } else if (e.key === 'ArrowLeft') {
  //         handleNext()
  //       } else if (e.key === ' ') {
  //         handleSwap()
  //       }
  //     }
  //     window.addEventListener('keydown', keyBinding)
  //     return () => {
  //       window.removeEventListener('keydown', keyBinding)
  //     }
  //   },
  //   []
  // )

  return {
    leftPage,
    rightPage,
    handleNext,
    handlePrev,
    handleSwap,
  }
}

const TurnReader: React.FC<Manga.Instance> = (manga) => {
  const {
    leftPage,
    rightPage,
    handleNext,
    handlePrev,
    handleSwap,
  } = useTurnReader(manga)

  return (
    <Box
      sx={{
        display: "flex",
        height: '100vh',
        position: 'relative'
      }}
    >
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          justifyContent: 'flex-end',
        }}
        onClick={handleNext}
      >
        {
          leftPage ? (
            <Img src={convertFileSrc(leftPage.path)} alt={leftPage.path} loading={'lazy'} />
          ) : <Empty />
        }
      </Box>
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          justifyContent: 'flex-start',
        }}
        onClick={handlePrev}
      >
        {
          rightPage ? (
            <Img src={convertFileSrc(rightPage.path)} alt={rightPage.path} loading={'lazy'} />
          ) : <Empty />
        }
      </Box>
      <IconButton
        sx={{
          position: 'absolute',
          right: 16,
          bottom: 16,
          opacity: .2,
          transition: 'opacity .2s',
          '&:hover': {
            opacity: 1,
          },
        }}
        onClick={handleSwap}
      >
        <SwapIcon />
      </IconButton>
    </Box>
  )
}

export default TurnReader
