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
  background-color: #272727;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 10px;
  z-index: 1;
  position: absolute;
  border-radius: 10px;
  width: 10rem;
  top: ${ props => props.$position.y - 60 }px; // Not sure why this is off by so much?
  left: ${ props => props.$position.x + 10 }px;
`

const MenuButton = styled.button`
  background-color: #4b4b4b;
  color: white;
  outline: none;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  padding: 4px;
  transition: 0.3s;
  cursor: pointer;

  &:hover {
    background-color: #777;
  }
`

export default ChannelContextMenu;
