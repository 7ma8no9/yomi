import type { FC, PropsWithChildren } from 'react'
import {HeroUIProvider} from "@heroui/react";

const Provider: FC<PropsWithChildren> = ({ children}) => {
  return  (
    <HeroUIProvider>
      {children}
    </HeroUIProvider>
  )
}

export default Provider