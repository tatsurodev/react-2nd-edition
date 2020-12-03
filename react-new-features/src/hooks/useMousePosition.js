import { useState, useEffect } from 'react'

const useMousePosition = () => {
  // x, yは共に変化するのでobjectで保存してもおｋ
  const [position, setPosition] = useState({ x: 0, y: 0 })
  // stateが変化する度componentがrerenderされ、event listenerが加えられるのでmemory leakが起こるので、custom hooksは一度だけ実行されるようにする
  useEffect(() => {
    console.log('Setting up event')
    const handleMouseMove = (e) => {
      setPosition({
        x: e.pageX,
        y: e.pageY,
      })
    }

    document.addEventListener('mousemove', handleMouseMove)

    // unmount時にclean up
    return () => {
      console.log('Component unmouted')
      document.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return position
}

export { useMousePosition as default }
