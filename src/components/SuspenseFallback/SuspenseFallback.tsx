import React from 'react'
import {CircularProgress} from "@nextui-org/react";

export interface ISuspenseFallbackProps {
  LoadingComponent?: React.ReactNode
}

const SuspenseFallback: React.FC<ISuspenseFallbackProps> = (
  {
    LoadingComponent,
  }
) => {
  return (
    <div className='w-full h-full grid place-items-center'>
      {
        LoadingComponent
          ? LoadingComponent
          : <CircularProgress size='md' aria-label={'Loading'} />
      }
    </div>
  )
}

export default SuspenseFallback
