import {Box, CircularProgress, ListItem, styled} from "@mui/material";
import React from "react";
import {FileEntry} from "@tauri-apps/api/fs";
import { convertFileSrc } from '@tauri-apps/api/tauri'

const Img = styled('img')`
  width: 100%;
  object-fit: cover;
`

const useIsInViewport = (ref: React.RefObject<HTMLElement>) => {
  const [isIntersecting, setIsIntersecting] = React.useState<boolean>(false)

  const observer = React.useMemo(
    () => (
      new IntersectionObserver(([entry]) =>
        setIsIntersecting(entry.isIntersecting)
      )
    ),
    []
  )

  React.useEffect(
    () => {
      if (!ref.current) return
      observer.observe(ref.current)

      return () => {
        observer.disconnect()
      }
    },
    [ref, observer]
  )

  return isIntersecting
}

const Page: React.FC<FileEntry & { idx: number }> = (
  {
    name,
    path,
    idx,
  }
) => {
  return (
    <ListItem>
      <Img src={convertFileSrc(path)} alt={name || path} loading={'lazy'} />
    </ListItem>
  )
}

export default Page
