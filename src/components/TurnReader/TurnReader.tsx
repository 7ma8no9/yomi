import React from 'react'
import {FileEntry} from "@tauri-apps/api/fs";
import {readMangaList} from "@utils/tool";
import {Box, styled} from "@mui/material";
import {convertFileSrc} from "@tauri-apps/api/tauri";

const Img = styled('img')`
  object-fit: contain;
  height: 100%;
  max-width: 100%;
`

const useTurnReader = (manga: Manga.Instance) => {
  const [curIdx, setCurIdx] = React.useState<number>(0)
  const [fileList, setFileList] = React.useState<FileEntry[]>([])

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
      if (x > 1) {
        return x - 2
      } else {
        return x
      }
    })
  }

  const leftPage = fileList[curIdx + 1]
  const rightPage = fileList[curIdx]

  React.useEffect(
    () => {
      readMangaList(manga.path).then(setFileList)
    },
    [manga]
  )

  return {
    leftPage,
    rightPage,
    handleNext,
    handlePrev,
  }
}

const TurnReader: React.FC<Manga.Instance> = (manga) => {
  const {
    leftPage,
    rightPage,
    handleNext,
    handlePrev,
  } = useTurnReader(manga)

  return (
    <Box
      sx={{
        display: "flex",
        height: '100vh',
      }}
    >
      <Box
        sx={{
          flexGrow: 1,
          display: 'flex',
          justifyContent: 'flex-end',
        }}
        onClick={handleNext}
      >
        {
          leftPage ? (
            <Img src={convertFileSrc(leftPage.path)} alt={leftPage.path} loading={'lazy'} />
          ) : null
        }
      </Box>
      <Box
        sx={{
          flexGrow: 1,
          display: 'flex',
          justifyContent: 'flex-start',
        }}
        onClick={handlePrev}
      >
        {
          rightPage ? (
            <Img src={convertFileSrc(rightPage.path)} alt={rightPage.path} loading={'lazy'} />
          ) : null
        }
      </Box>
    </Box>
  )
}

export default TurnReader
