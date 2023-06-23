import React from 'react'
import {Box, Container, List} from "@mui/material";
import {FileEntry, readDir} from "@tauri-apps/api/fs";
import {getSuffix} from "@utils/tool";
import Page from "@components/ScrollReader/Page";
import {convertFileSrc} from "@tauri-apps/api/tauri";
import Scrollbars from "react-custom-scrollbars";

const useScrollReader = (manga: Manga.Instance) => {
  const [fileList, setFileList] = React.useState<Array<FileEntry>>([])

  const readFile = async (manga: Manga.Instance) => {
    const fileList = await readDir(manga.path, { recursive: false })
    setFileList(fileList.filter(x => ['png', 'jpeg', 'jpg'].includes(getSuffix(x.name || ''))))
  }

  React.useEffect(
    () => {
      readFile(manga)
    },
    [manga]
  )

  return {
    fileList,
  }
}

const ScrollReader: React.FC<Manga.Instance> = (manga) => {
  const { fileList } = useScrollReader(manga)

  return (
    <Box height={'100vh'}>
      <Scrollbars>
        <Container maxWidth={'lg'}>
          <List>
            {
              fileList.map((file, idx) => (
                <Page {...file} idx={idx} />
              ))
            }
          </List>
        </Container>
      </Scrollbars>
    </Box>
  )
}

export default ScrollReader
