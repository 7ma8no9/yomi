import React from 'react'
import {useNavigate} from "react-router-dom";
import {Card, CardFooter, cn, Image} from "@nextui-org/react";
import {convertFileSrc} from "@tauri-apps/api/tauri";

import * as EPaths from '@shared/enums/paths'
import {getMangaCover} from "@utils/tool.ts";
import {FileEntry} from "@tauri-apps/api/fs";
import defaultCover from './defaultCover.jpg'

export interface MangaCardProps {
  manga: Manga.Instance
}

const useMangaCard = (props: MangaCardProps) => {
  const navigate = useNavigate()

  const [cover, setCover] = React.useState<string | null>(null)

  const { manga: { id, name, path, invalid }  } = props


  React.useEffect(
    () => {
      getMangaCover(path).then((file?: FileEntry) => {
        if (file) {
          setCover(convertFileSrc(file.path))
        } else {
          setCover(null)
        }
      })
    },
    [path]
  )


  const handlePress = () => {
    navigate({
      pathname: EPaths.Library.Manga.replace(':mangaId', id),
    })
  }

  return {
    name,
    cover,
    invalid,
    handlePress,
  }
}

const MangaCard: React.FC<MangaCardProps> = (props) => {
  const {
    name,
    cover,
    invalid,
    handlePress,
  } = useMangaCard(props)

  return (
    <Card
      className={'w-full aspect-3/4'}
      isFooterBlurred
      onPress={handlePress}
      isPressable={!invalid}
    >
      <Image
        alt={name}
        className={'object-cover'}
        height={'100%'}
        width={'100%'}
        src={cover || defaultCover}
        classNames={{
          'wrapper': 'w-full h-full',
          'img': 'w-full h-full',
        }}
      />
      <CardFooter
        className={cn([
          "justify-between",
          "before:bg-white/10",
          "border-white/20",
          "border-1",
          "overflow-hidden",
          "py-1",
          "absolute",
          "before:rounded-xl",
          "rounded-large",
          "bottom-1",
          "w-[calc(100%_-_8px)]",
          "shadow-small",
          "ml-1",
          "z-10",
          'bg-white/20',
          'backdrop-blur-lg',
        ])}
      >
        <p className="w-full text-center text-black line-clamp-2">
          {name}
        </p>
      </CardFooter>
    </Card>
  )
}

export default MangaCard
