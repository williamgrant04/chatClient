import { Link, useParams } from "@tanstack/react-router"
import { useState } from "react"
import styled from "styled-components"
import ChannelContextMenu from "./ChannelContextMenu"

const initialContextMenu = {
  shown: false,
  x: 0,
  y: 0
}

const ChannelButton = ({ channel } : { channel: Channel }) => {
  const { serverId } = useParams({ from: "/_auth/server/$serverId/$channelId" })
  const [contextMenu, setContextMenu] = useState(initialContextMenu)

  const channelContextMenu = (e: React.MouseEvent) => {
    e.preventDefault()
    setContextMenu({ shown: true, x: e.pageX, y: e.pageY })
  }

  return (
    <>
      {contextMenu.shown && <ChannelContextMenu position={{ x: contextMenu.x, y: contextMenu.y }} close={()=> setContextMenu(initialContextMenu)}/>}
      <ChannelLink to={`${channel.id}`} from={`/server/${serverId}`} onContextMenu={channelContextMenu}>{channel.name}</ChannelLink>
    </>
  )
}

const ChannelLink = styled(Link)`
  padding: 10px;
  border-radius: 10px;
  background-color: #808080;
  width: 80%;
  cursor: pointer;
  overflow: hidden;
  text-overflow: ellipsis;
  color: #000;
  text-decoration: none;
  font-size: 1.1rem;
  transition: 0.2s;

  &.active {
    background-color: #606060;
  }

  &:hover {
    background-color: #c0c0c0;
  }
`

export default ChannelButton
