import React from 'react'
import PerfectScrollbar from "perfect-scrollbar";
import 'perfect-scrollbar/css/perfect-scrollbar.css'
import {useResizeDetector} from "react-resize-detector";



const Scrollbar: React.FC<React.PropsWithChildren> = ({ children }) => {
  const containerRef = React.useRef<HTMLDivElement>(null)
  const { ref: wrapRef, width, height } = useResizeDetector()
  const { ref: contentRef, width: contentWidth, height: contentHeight } = useResizeDetector()
  const psRef = React.useRef<PerfectScrollbar>()

  // init ps
  React.useEffect(
    () => {
      const $c = containerRef.current
      if (!$c) return

      const $ps = psRef.current

      if ($ps) {
        $ps.destroy()
      }

      psRef.current = new PerfectScrollbar($c, {
        wheelSpeed: 2,
        wheelPropagation: true,
        minScrollbarLength: 20,
      })

      return () => {
        if ($ps) {
          $ps.destroy()
        }
      }

    },
    []
  )

  // update ps
  React.useEffect(
    () => {
      psRef.current?.update()
    },
    [width, height, contentWidth, contentHeight]
  )

  return (
    <div ref={wrapRef} className={'w-full h-full overflow-hidden'}>
      <div ref={containerRef} className={'relative overflow-hidden'} style={{ width, height }}>
        <div ref={contentRef}>
          {children}
        </div>
      </div>
    </div>
  )
}

export default Scrollbar
