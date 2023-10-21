import React from 'react'
import {ToastContainer} from "react-toastify";
import {useAtomValue} from "jotai";

import {themeAtom} from "@stores/global.ts";

const ToastProvider: React.FC = () => {
  const theme = useAtomValue(themeAtom)

  return (
    <ToastContainer
      position={'top-right'}
      hideProgressBar
      pauseOnFocusLoss
      pauseOnHover
      theme={theme}
    />
  )
}

export default ToastProvider
