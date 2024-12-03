import { Channel, Server } from "../../utils/APITypes"
import ChannelButton from "./ChannelButton"

const ChannelSidebar = ({ channels, server }: { channels: Channel[], server: Server }) => {

  return (
    <div>
      <div>
        <h2>{server.name}</h2>
      </div>
      <h2>Channel Sidebar</h2>
      {channels.map((channel: Channel) => {
        return (
          <ChannelButton key={channel.id} channel={channel}/>
        )
      })}
    </div>
  )
}

export default ChannelSidebar
