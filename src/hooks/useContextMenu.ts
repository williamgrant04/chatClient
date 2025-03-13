import { useState } from "react"

const initial = {
  shown: false,
  position: {
    x: 0,
    y: 0
  }
}

export const useContextMenu = () => {
  const [menu, setMenu] = useState(initial)

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
