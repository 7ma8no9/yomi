import { useState, useEffect } from "react";
import { invoke } from "@tauri-apps/api/core";
import {Button, Image } from "@heroui/react";
import { open } from '@tauri-apps/plugin-dialog'

function App() {
  const [url, setUrl] = useState<string | null>(null)
  const handleOpenFile = async (directory: boolean) => {
    const path = await open({
      multiple: false,
      directory,
    })

    if (!path) return

    invoke("get_index", {
      path,
    }).then((fileNames) => {
      return invoke("read_content", {
        path,
        fileName: (fileNames as string[])[0]
      })
    })
      .then(buf => {
        console.log('buf:\n', buf)
        setUrl(URL.createObjectURL(new Blob([new Uint8Array(buf as number[])])))
      })
      .catch(console.error)
  }

  useEffect(
    () => {
      return () => {
        if (url) {
          URL.revokeObjectURL(url)
        }
      }
    },
    [url]
  )

 return (
    <div className={'h-screen grid place-items-center'}>
      {
        url ? (
         <Image src={url} className={'max-w-full'} />
        ) : (
          <div className={'flex flex-col gap-4'}>
            <Button onPress={() => handleOpenFile(false)} color={'primary'}>Select a File</Button>
            <Button onPress={() => handleOpenFile(true)} color={'secondary'}>Select a Folder</Button>
          </div>
        )
      }
    </div>
  );
}

export default App;
