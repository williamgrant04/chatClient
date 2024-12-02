import { createFileRoute, Outlet, } from '@tanstack/react-router'
import ChannelSidebar from '../../../../components/ChannelSidebar/ChannelSidebar'
import { getChannels } from '../../../../utils/ChatAPI'
import { Channel } from '../../../../utils/APITypes'

export const Route = createFileRoute('/_auth/server/$serverId')({
  loader: async () => {
    const params = window.location.pathname.split('/')
    const channels = await getChannels(params[2]) // $serverId
    return channels
  },
  gcTime: 0,
  shouldReload: false,
  component: RouteComponent,
})

function RouteComponent() {
  const loaderData = Route.useLoaderData() as { channels: Channel[] }

  return (
    <>
      <ChannelSidebar channels={loaderData.channels}/>
      <Outlet />
    </>
  )
}
