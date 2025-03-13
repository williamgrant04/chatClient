import { useEffect, useState } from "react"

interface MenuState {
  shown: boolean,
  position: {
    x: number,
    y: number
  }
}

interface MenuValues {
  onMenu: (e: React.MouseEvent) => void,
  close: () => void,
  menu: MenuState
}

const initial = {
  shown: false,
  position: {
    x: 0,
    y: 0
  }
}

export const useContextMenu = (hovering? : boolean): MenuValues => {
  const [menu, setMenu] = useState<MenuState>(initial)

  useEffect(() => {
    if (hovering === false) {
      setMenu(initial)
    }
  }, [hovering])

  const onMenuEvent = (e: React.MouseEvent) => {
    e.preventDefault()
    setMenu({ shown: true, position: { x: e.clientX, y: e.clientY } })
  }

  const close = () => {
    setMenu(initial)
  }

  return {
    onMenu: onMenuEvent,
    close,
    menu
  }
}
