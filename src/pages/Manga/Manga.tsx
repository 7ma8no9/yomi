import React from 'react'
import {useNavigate, useParams} from "react-router-dom";
import {FileEntry} from "@tauri-apps/api/fs";
import {invoke} from "@tauri-apps/api";
import {toast} from "react-toastify";

import {getMangaPageList} from "@utils/tool.ts";
import * as EPaths from '@shared/enums/paths'
import {Button, Navbar, NavbarBrand, NavbarContent} from "@nextui-org/react";
import IconHome from "@icons/Home.tsx";
import {convertFileSrc} from "@tauri-apps/api/tauri";

const useManga = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = React.useState<boolean>(false)
  const [name, setName] = React.useState<string>('')
  const [mangaPageList, setMangaPageList] = React.useState<FileEntry[]>([])
  const { mangaId } = useParams()

  const handleClose = () => {
    navigate({
      pathname: EPaths.Primary.Layout
    })
  }

  React.useEffect(
    () => {
      if (!mangaId) return
      setLoading(true)
      invoke('get_manga_by_id', { id: parseInt(mangaId) })
        .then((manga) => {
          setName((manga as Manga.Instance).name)
          return getMangaPageList((manga as Manga.Instance).path)
        })
        .then(setMangaPageList)
        .catch(() => {
          toast.error('Failed to read the manga')
        })
        .finally(() => {
          setLoading(false)
        })
    },
    [mangaId]
  )

  return {
    name,
    loading,
    mangaPageList,
    handleClose,
  }
}

const Manga: React.FC = () => {
  const {
    name,
    mangaPageList,
    handleClose,
  } = useManga()

  return (
    <div>
        <Navbar maxWidth={'full'} shouldHideOnScroll>
          <NavbarBrand>
            <Button variant={'light'} onClick={handleClose} isIconOnly>
              <IconHome className={'text-xl'} />
            </Button>
          </NavbarBrand>
          <NavbarContent justify={'center'} className={'grow overflow-hidden'}>
            <p className={'text-center truncate'}>{name}</p>
          </NavbarContent>
          <NavbarContent justify={'end'}>
            Actions TODO!
          </NavbarContent>
        </Navbar>
        <div className={'flex flex-col items-center'}>
          {
            mangaPageList.map((page, idx) => (
              <img className={'object-fill w-full max-w-7xl'} src={convertFileSrc(page.path)} alt={`page_${idx}`} key={idx} loading={'lazy'} />
            ))
          }
        </div>
    </div>
  )
}

export default Manga
