import { Link } from "@tanstack/react-router"
import { Channel } from "../../utils/APITypes"

const ChannelButton = ({ channel } : { channel: Channel }) => {
  return (
    <div>
      <Link to={`${channel.id}`}>{channel.name}</Link>
    </div>
  )
}

export default ChannelButton
