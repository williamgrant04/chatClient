import Channel from "./Channel"

const ChannelSidebar = ({ channels }: { channels: any }) => {

  return (
    <div>
      <h2>Channel Sidebar</h2>
      {channels.map((channel: any) => {
        return (
          <Channel key={channel.id} channel={channel}/>
        )
      })}
    </div>
  )
}

export default ChannelSidebar
