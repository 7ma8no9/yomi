import React from 'react'
import {Container, Dialog, Zoom} from "@mui/material";
import {useAtom} from "jotai";
import {currentMangaAtom} from "./store";
import ScrollReader from "@components/ScrollReader";
import {TransitionProps} from "@mui/material/transitions";
import TurnReader from "@components/TurnReader";

const DialogTransition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>
  },
  ref: React.Ref<unknown>
) {
  const { children, ...rest} = props
  return <Zoom ref={ref} {...rest} children={children} style={{ transformOrigin: "center" }} />
})

const Reader: React.FC = () => {
  const [currentManga, setCurrentManga] = useAtom(currentMangaAtom)
  const open = Boolean(currentManga)

  return (
    <Dialog
      open={open} onClose={() => setCurrentManga(null)}
      fullScreen TransitionComponent={DialogTransition}
    >
      {
        currentManga ? (
          <TurnReader {...currentManga} />
          // <ScrollReader {...currentManga} />
        ) : null
      }
    </Dialog>
  )
}

export default Reader
