import { createFileRoute } from '@tanstack/react-router'
import Channel from '../../../../../components/Channel/Channel'
import { getMessages } from '../../../../../utils/ChatAPI'
import { Message } from '../../../../../utils/APITypes'

export const Route = createFileRoute('/_auth/server/$serverId/$channelId')({
  loader: async () => {
    const channelId = window.location.pathname.split('/')[3] // $channelId
    const res = await getMessages(channelId)
    return res
  },
  component: ChannelLoader,
})

function ChannelLoader() {
  const loaderData = Route.useLoaderData() as { messages: Message[] }

  return (
    <Channel messages={loaderData.messages}/>
  )
}
