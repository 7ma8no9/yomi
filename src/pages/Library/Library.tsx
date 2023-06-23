import React from 'react'
import {Box, Button, IconButton} from "@mui/material";
import AddIcon from '@mui/icons-material/Add'

import {useAddManga, useLibrary} from "./hook";
import Manga from '@components/Manga'
import Reader from './Reader'

const Empty: React.FC = () => {
  const addManga = useAddManga()

  return (
    <Box
      sx={{
        display: 'grid',
        placeItems: 'center',
        height: '100vh',
      }}
    >
      <Button variant={'contained'} onClick={addManga}>添加漫画</Button>
    </Box>
  )
}

const AddManga: React.FC = () => {
  const handleAdd = useAddManga()
  return (
    <Box>
      <Button
        sx={{
          height: '100%',
          width: '100%',
        }}
        size={'large'}
        onClick={handleAdd}
        variant={'outlined'}
      >
        <AddIcon />
        添加漫画
      </Button>
    </Box>
  )
}

const Inner: React.FC = () => {
  const { mangaList, handleClick } = useLibrary()

  if (!mangaList.length) {
    return <Empty />
  }

  return (
    <>
      <Box
        sx={{
          display: 'grid',
          gridTemplate: 'auto/repeat(auto-fill, minmax(400px, 1fr))',
          gap: '40px',
          p: 2,
        }}
      >
        <AddManga />
        {
          mangaList.map(manga => (
            <Manga
              key={manga.id}
              manga={manga}
              onClick={handleClick}
            />
          ))
        }
      </Box>
      <Reader />
    </>
  )
}

const Fallback: React.FC = () => {
  // TODO
  return (
    <>Loading...</>
  )
}

const Library: React.FC = () => {
  return (
    <React.Suspense fallback={<Fallback />}>
      <Inner />
    </React.Suspense>
  )
}

export default Library
