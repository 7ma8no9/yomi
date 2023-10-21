import React from "react";
import { useSetAtom } from 'jotai'

import {themeAtom} from "@stores/global.ts";

const useThemeDetect = () => {
  const setTheme = useSetAtom(themeAtom)

  React.useLayoutEffect(
    () => {
      const isDark = () => window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches

      if (isDark()) {
        document.documentElement.classList.add("dark");
        setTheme('dark')
      } else {
        document.documentElement.classList.remove("dark");
        setTheme('light')
      }
    },
    [setTheme]
  )

  React.useEffect(
    () => {
      const handler = (event: MediaQueryListEvent) => {
        const newColorScheme = event.matches ? "dark" : "light";

        if (newColorScheme === "dark") {
          document.documentElement.classList.add("dark");
          setTheme('dark')
        } else {
          document.documentElement.classList.remove("dark");
          setTheme('light')
        }
      }

      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', handler)

      return () => {
        window.matchMedia('(prefers-color-scheme: dark)').removeEventListener('change', handler)
      }
    },
    [setTheme]
  )
}

export default useThemeDetect
