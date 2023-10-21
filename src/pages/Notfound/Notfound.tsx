import React from 'react'
import {Button, Divider} from "@nextui-org/react";

const Notfound: React.FC = () => {
  return (
    <div className={'h-screen w-screen grid place-items-center light:bg-slate-50'}>
      <div className={'flex flex-col items-center gap-y-4'}>
        <p className={'flex gap-x-2 h-7 text-xl'}>
          <span>404</span>
          <Divider orientation={'vertical'} />
          <span>Notfound</span>
        </p>
        <Button variant={'flat'} color={'primary'} href={'/'} as={'a'}>
          Back
        </Button>
      </div>
    </div>
  )
}

export default Notfound
