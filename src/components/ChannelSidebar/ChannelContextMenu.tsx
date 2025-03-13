import styled from "styled-components";
import { useClickOutside } from "../../hooks/useClickOutside";
import { useRef } from "react";
import { deleteChannel } from "../../utils/ChatAPI";
import { useNavigate, useParams } from "@tanstack/react-router";

interface ContextMenuProps {
  position: {
    x: number,
    y: number
  },
  close: () => void,
  channel: Channel,
  server: Server
}

const ChannelContextMenu = ({ position, close, channel, server }: ContextMenuProps) => {
  const menuRef = useRef<HTMLDivElement>(null)
  const { channelId, serverId } = useParams({ from: "/_auth/server/$serverId/$channelId" })
  const navigate = useNavigate()
  useClickOutside(menuRef, close)

  const deleteChannelHandler = async () => {
    await deleteChannel(channel.id)
    if (channelId === `${channel.id}`) {
      navigate({ to: `/server/${serverId}/${server.defaultChannel.id}` })
    }
  }

  return (
    <Menu $position={position} ref={menuRef}>
      <MenuButton>Edit channel</MenuButton>
      <MenuButton onClick={deleteChannelHandler}>Delete channel</MenuButton>
    </Menu>
  )
}

const Menu = styled.div<{ $position: { x: number, y: number } }>`
  background-color: red;
  z-index: 1;
  position: absolute;
  width: 10rem;
  top: ${ props => props.$position.y - 60 }px; // Not sure why this is off by so much?
  left: ${ props => props.$position.x + 10 }px;
`

const MenuButton = styled.button`

`

export default ChannelContextMenu;
