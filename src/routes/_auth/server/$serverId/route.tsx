import { createFileRoute, Outlet, } from '@tanstack/react-router'
import ChannelSidebar from '../../../../components/ChannelSidebar/ChannelSidebar'
import { getChannels, getServer } from '../../../../utils/ChatAPI'
import { Channel, Server } from '../../../../utils/APITypes'

export const Route = createFileRoute('/_auth/server/$serverId')({
  loader: async () => {
    const params = window.location.pathname.split('/')
    const channels = await getChannels(params[2]) // $serverId
    const server = await getServer(params[2]) // $serverId
    return { ...channels, ...server }
  },
  component: ChannelLayout,
})

function ChannelLayout() {
  const loaderData = Route.useLoaderData() as { channels: Channel[], server: Server }

  return (
    <>
      <ChannelSidebar channels={loaderData.channels} server={loaderData.server}/>
      <Outlet />
    </>
  )
}
