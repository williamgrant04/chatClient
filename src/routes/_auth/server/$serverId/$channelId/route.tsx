import { createFileRoute } from '@tanstack/react-router'
import Channel from '../../../../../components/Channel/Channel'
import { getChannel, getMessages } from '../../../../../utils/ChatAPI'
import { IChannel, Message } from '../../../../../utils/APITypes'

export const Route = createFileRoute('/_auth/server/$serverId/$channelId')({
  loader: async () => {
    const channelId = window.location.pathname.split('/')[3] // $channelId
    const messages = await getMessages(channelId)
    const channel = await getChannel(channelId)
    return { ...messages, ...channel }
  },
  component: ChannelLoader,
})

function ChannelLoader() {
  const loaderData = Route.useLoaderData() as { messages: Message[], channel: IChannel }

  return (
    <Channel messages={loaderData.messages} channel={loaderData.channel}/>
  )
}
