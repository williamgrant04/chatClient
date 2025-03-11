import { createFileRoute } from '@tanstack/react-router'
import Channel from '../../../../../components/Channel/Channel'
import { getChannel, getMessages } from '../../../../../utils/ChatAPI'

export const Route = createFileRoute('/_auth/server/$serverId/$channelId')({
  loader: async () => {
    const channelId = window.location.pathname.split('/')[3] // $channelId
    const serverId = window.location.pathname.split("/")[2] // $serverId
    const messages = await getMessages(channelId)
    const channel = await getChannel(channelId, serverId)
    return { ...messages, ...channel }
  },
  component: ChannelLoader,
})

function ChannelLoader() {
  const loaderData = Route.useLoaderData() as { messages: Message[], channel: Channel }

  return (
    <Channel messages={loaderData.messages} channel={loaderData.channel}/>
  )
}
