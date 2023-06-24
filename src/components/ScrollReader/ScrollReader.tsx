import React from 'react'
import {Box, Container, List} from "@mui/material";
import {FileEntry, readDir} from "@tauri-apps/api/fs";
import {getSuffix, readMangaList} from "@utils/tool";
import Page from "@components/ScrollReader/Page";
import Scrollbars from "react-custom-scrollbars";

const useScrollReader = (manga: Manga.Instance) => {
  const [fileList, setFileList] = React.useState<Array<FileEntry>>([])

  React.useEffect(
    () => {
      readMangaList(manga.path).then(setFileList)
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
                <Page path={file.path} key={idx} />
              ))
            }
          </List>
        </Container>
      </Scrollbars>
    </Box>
  )
}

export default ScrollReader
