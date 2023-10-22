import React from 'react'
import {useNavigate} from "react-router-dom";
import {Button, Card, CardFooter, cn, Image} from "@nextui-org/react";
import {convertFileSrc} from "@tauri-apps/api/tauri";

import * as EPaths from '@shared/enums/paths'
import {getMangaCover} from "@utils/tool.ts";
import {FileEntry} from "@tauri-apps/api/fs";
import defaultCover from './defaultCover.svg'
import IconClose from "@icons/Close.tsx";
import {invoke} from "@tauri-apps/api";
import {useSetAtom} from "jotai";
import {mangaListAtom} from "@pages/Library/store.ts";

export interface MangaCardProps {
  manga: Manga.Instance
}

const useMangaCard = (props: MangaCardProps) => {
  const navigate = useNavigate()
  const refreshManga = useSetAtom(mangaListAtom)

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

  const handleDelete = async () => {
    await invoke('remove_manga_by_id', { id: parseInt(id) })
    refreshManga()
  }

  return {
    name,
    cover,
    invalid,
    handlePress,
    handleDelete,
  }
}

const MangaCard: React.FC<MangaCardProps> = (props) => {
  const {
    name,
    cover,
    invalid,
    handlePress,
    handleDelete,
  } = useMangaCard(props)

  return (
    <Card
      className={'w-full aspect-3/4 relative group'}
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
        loading={'lazy'}
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
      <Button
        className={'absolute top-2 right-2 z-10 hidden group-hover:inline-flex'}
        isIconOnly as={'a'} variant={'flat'}
        onClick={handleDelete}
      >
        <IconClose className={'text-lg'} />
      </Button>
    </Card>
  )
}

export default MangaCard
