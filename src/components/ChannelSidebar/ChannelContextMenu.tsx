import styled from "styled-components";
import { useClickOutside } from "../../hooks/useClickOutside";
import { useRef } from "react";

interface ContextMenuProps {
  position: {
    x: number,
    y: number
  },
  close: () => void
}

const ChannelContextMenu = ({ position, close }: ContextMenuProps) => {
  const menuRef = useRef<HTMLDivElement>(null)
  useClickOutside(menuRef, close)

  return (
    <Menu $position={position} ref={menuRef}>
      content
    </Menu>
  )
}

const Menu = styled.div<{ $position: { x: number, y: number } }>`
  background-color: red;
  position: absolute;
  top: ${ props => props.$position.y - 60 }px; // Not sure why this is off by so much?
  left: ${ props => props.$position.x + 10 }px;
`

export default ChannelContextMenu;
