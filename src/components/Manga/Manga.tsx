import React from 'react'
import {Card, CardActionArea, CardActions, CardMedia, CardContent, Typography} from "@mui/material";
import {useManga} from "./hook";
import {Provider} from "jotai";

export interface MangaProps {
  manga: Manga.Instance
  onClick?: (manga: Manga.Instance) => void
}
const Inner: React.FC<MangaProps> = (
  {
    manga,
    onClick,
  }
) => {
  const { cover, name } = useManga(manga)

  return (
    <Card>
      <CardActionArea onClick={() => { onClick && onClick(manga) }}>
        <CardMedia
          component={'img'} src={cover}
          sx={{
            width: '100%',
            aspectRatio: '4/3',
            objectFit: 'cover',
          }}
        />
        <CardContent>
          <Typography noWrap>{name}</Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

const Manga: React.FC<MangaProps> = (props) => {
  return (
    <Provider>
      <React.Suspense>
        <Inner {...props} />
      </React.Suspense>
    </Provider>
  )
}

export default Manga
