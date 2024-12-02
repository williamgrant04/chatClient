import { Link } from "@tanstack/react-router"
import { Channel } from "../../utils/APITypes"

const ChannelDetails = ({ channel } : { channel: Channel }) => {
  return (
    <div>
      <Link to={`${channel.id}`}>{channel.name}</Link>
    </div>
  )
}

export default ChannelDetails
