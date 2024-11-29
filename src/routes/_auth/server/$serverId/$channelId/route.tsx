import { createFileRoute } from '@tanstack/react-router'
import Channel from '../../../../../components/Channel/Channel'
import { getMessages } from '../../../../../utils/ChatAPI'

export const Route = createFileRoute('/_auth/server/$serverId/$channelId')({
  loader: async () => {
    const channelId = window.location.pathname.split('/')[3] // $channelId
    const res = await getMessages(channelId) as any
    return res
  },
  gcTime: 0,
  shouldReload: false,
  component: LoaderChannel,
})

function LoaderChannel() {
  const loaderData = Route.useLoaderData() as any
  console.log(loaderData)

  return (
    <Channel messages={loaderData.messages}/>
  )
}
