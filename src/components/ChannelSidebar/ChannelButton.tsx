import { Link, useParams } from "@tanstack/react-router"
import styled from "styled-components"
import ChannelContextMenu from "./ChannelContextMenu"
import { useContextMenu } from "../../hooks/useContextMenu"

interface ChannelButtonProps {
  channel: Channel,
  hovering: boolean
}

const ChannelButton = ({ channel, hovering }: ChannelButtonProps) => {
  const { serverId } = useParams({ from: "/_auth/server/$serverId/$channelId" })
  const { onMenu, close, menu } = useContextMenu(hovering)

  return (
    <>
      {menu.shown && <ChannelContextMenu position={ menu.position } close={close}/>}
      <ChannelLink to={`${channel.id}`} from={`/server/${serverId}`} onContextMenu={onMenu}>{channel.name}</ChannelLink>
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
