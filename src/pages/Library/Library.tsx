import React from 'react'
import {Button} from "@nextui-org/react";

import SuspenseFallback from "@components/SuspenseFallback";
import MangaCard from "@components/MangaCard";
import {useLibrary} from "./hook.ts";
import IconAddOutline from "@icons/AddOutline.tsx";

const Inner: React.FC = () => {
  const {
    isEmpty,
    mangaList,
    handleAddManga,
  } = useLibrary()

  if (isEmpty) {
    return (
      <div className={'h-screen w-screen grid place-items-center'}>
        <Button
          onClick={handleAddManga}
          color={'primary'}
          size={'lg'}
          variant={"shadow"}
          className={'hover:drop-shadow-xl active:drop-shadow-2xl'}
        >
          Add Manga
        </Button>
      </div>
    )
  }

  return (
    <>
      <div className={'grid grid-cols-fill-70 grid-rows-auto gap-6 p-6'}>
        {
          mangaList.map((manga) => (
            <MangaCard key={manga.id} manga={manga} />
          ))
        }
      </div>
      <div className={'fixed bottom-4 right-4 z-40'}>
        <Button
          variant={'shadow'}
          className={'rounded-full bg-gradient-to-tr from-success-500 to-cyan-500 drop-shadow-2xl'}
          isIconOnly
          size={'lg'}
          onClick={handleAddManga}
        >
          <IconAddOutline className={'text-2xl'} />
        </Button>
      </div>
    </>
  )
}

const Library: React.FC = () => {
  return (
    <React.Suspense fallback={<SuspenseFallback />}>
      <Inner />
    </React.Suspense>
  )
}

export default Library
