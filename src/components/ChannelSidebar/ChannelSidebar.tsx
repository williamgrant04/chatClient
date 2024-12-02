import { Channel } from "../../utils/APITypes"
import ChannelDetails from "./ChannelDetails"

const ChannelSidebar = ({ channels }: { channels: Channel[] }) => {

  return (
    <div>
      <h2>Channel Sidebar</h2>
      {channels.map((channel: Channel) => {
        return (
          <ChannelDetails key={channel.id} channel={channel}/>
        )
      })}
    </div>
  )
}

export default ChannelSidebar
