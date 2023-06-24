import { ListItem, styled } from "@mui/material";
import React from "react";
import { convertFileSrc } from '@tauri-apps/api/tauri'

const Img = styled('img')`
  width: 100%;
  object-fit: cover;
`

// const useIsInViewport = (ref: React.RefObject<HTMLElement>) => {
//   const [isIntersecting, setIsIntersecting] = React.useState<boolean>(false)
//
//   const observer = React.useMemo(
//     () => (
//       new IntersectionObserver(([entry]) =>
//         setIsIntersecting(entry.isIntersecting)
//       )
//     ),
//     []
//   )
//
//   React.useEffect(
//     () => {
//       if (!ref.current) return
//       observer.observe(ref.current)
//
//       return () => {
//         observer.disconnect()
//       }
//     },
//     [ref, observer]
//   )
//
//   return isIntersecting
// }

const Page: React.FC<{ path: string }> = (
  {
    path,
  }
) => {
  return (
    <ListItem>
      <Img src={convertFileSrc(path)} alt={path} loading={'lazy'} />
    </ListItem>
  )
}

export default Page
