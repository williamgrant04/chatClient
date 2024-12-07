import styled from "styled-components"
import ChannelButton from "./ChannelButton"

const ChannelSidebar = ({ channels, server }: { channels: Channel[], server: Server }) => {
  // TODO: Add an option to turn off the hover, and make it a permanent sidebar

  return (
    <Sidebar>
      <ServerDetails>
        <p>{server.name}</p>
      </ServerDetails>
      <ChannelList>
        {channels.map((channel: Channel) => {
          return (
            <ChannelButton key={channel.id} channel={channel}/>
          )
        })}
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
  gap: 30px;
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

export default ChannelSidebar
