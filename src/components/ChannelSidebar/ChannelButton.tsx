import { Link } from "@tanstack/react-router"
import styled from "styled-components"

const ChannelButton = ({ channel } : { channel: Channel }) => {
  return (
    <ChannelLink to={`${channel.id}`}>{channel.name}</ChannelLink>
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
