import styled from "styled-components"
import ChannelButton from "./ChannelButton"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlus } from "@fortawesome/free-solid-svg-icons/faPlus"
import { useContext, useEffect, useState } from "react"
import CreateChannelModal from "./CreateChannelModal"
import userContext from "../../context/UserContext"
import { createConsumer } from "@rails/actioncable"
import { useParams } from "@tanstack/react-router"

const cable = createConsumer("ws://localhost:3000/cable")

// TODO: Add an option to turn off the hover, and make it a permanent sidebar
const ChannelSidebar = ({ server, ...props }: { channels: Channel[], server: Server }) => {
  const [channels, setChannels] = useState(props.channels)
  const [open, setOpen] = useState(false)
  const [hovering, setHovering] = useState(false)
  const { user } = useContext(userContext)
  const { serverId } = useParams({ from: "/_auth/server/$serverId/$channelId" })

  useEffect(() => {
    setChannels(props.channels)

    cable.subscriptions.create({ channel: "ChannelChannel", id: serverId }, { received: (data: { destroy?: boolean, channel: Channel }) => {
      if (data.destroy) {
        setChannels(prevChannels => prevChannels.filter(channel => channel.id !== data.channel.id))
      } else {
        setChannels(prevChannels => [ ...prevChannels, data.channel ])
      }
    }})

    return () => cable.disconnect()
  }, [serverId])

  return (
    <Sidebar onMouseEnter={() => setHovering(true)} onMouseLeave={() => setHovering(false)}>
      <ServerDetails>
        <p>{server.name}</p>
      </ServerDetails>
      <CreateChannelModal open={open} setOpen={setOpen} server={server}/>
      <ChannelList>
        {
          user?.id === server.owner.id &&
          <CreateChannel onClick={() => setOpen(true)}>
            <FontAwesomeIcon icon={faPlus}/>&nbsp;New channel
          </CreateChannel>
        }
        {channels.map((channel: Channel) => <ChannelButton key={channel.id} channel={channel} hovering={hovering} {...{server}}/>)}
      </ChannelList>
    </Sidebar>
  )
}

const Sidebar = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #a0a0a0;
  height: -webkit-fill-available;
  width: 250px;
  left: -250px;
  padding-right: 40px;
  gap: 10px;
  transition: 0.3s;
  z-index: 1;

  // Add a shadow to the right side of the sidebar without the shadow being visible on any other side
  &::after {
    content: "";
    height: 100%;
    position: absolute;
    top: 0;
    width: 6px;
    box-shadow: 6px 0 6px -6px inset;
    right: -6px;
  }

  &:hover {
    left: 0;
    padding-right: 0px;
  }
`

const ServerDetails = styled.div`
  display: flex;
  align-items: center;
  width: -webkit-fill-available;
  height: 30px;
  padding: 10px 20px;
  font-size: 1.6rem;
  background-color: #606060;

  p { margin: 0; }
`

const ChannelList = styled.div`
  overflow-y: auto;
  display: grid;
  justify-items: center;
  align-items: start;
  gap: 15px;
  width: 90%;
  margin-bottom: 10px;

  &::-webkit-scrollbar {
    height: 10px;
    width: 6px;
  }

  /* Track */
  &::-webkit-scrollbar-track {
    margin: 5px;
    background: #c0c0c0;
    border-radius: 10px;
  }

  /* Handle */
  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background: #888;
  }

  /* Handle on hover */
  &::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`

const CreateChannel = styled.button`
  display: block;
  border: none;
  padding: 10px;
  border-radius: 10px;
  background-color: #808080;
  width: 90%;
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

export default ChannelSidebar
