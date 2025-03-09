import type { FC, PropsWithChildren } from 'react'
import {HeroUIProvider, ToastProvider} from "@heroui/react";

const Provider: FC<PropsWithChildren> = ({ children}) => {
  return  (
    <HeroUIProvider>
      {children}
      <ToastProvider />
    </HeroUIProvider>
  )
}

export default Provider