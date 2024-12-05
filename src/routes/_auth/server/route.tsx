import { createFileRoute, Outlet } from '@tanstack/react-router'
import ServerBar from '../../../components/ServerBar/ServerBar'
import { getServers } from '../../../utils/ChatAPI'
import { Server } from '../../../APITypes'

export const Route = createFileRoute('/_auth/server')({
  loader: async () => {
    const data = (await getServers())
    return data
  },
  component: ServerLayout,
})

function ServerLayout() {
  const loaderData = Route.useLoaderData() as { servers: Server[] }

  return (
    <>
      <ServerBar servers={loaderData.servers} />
      <Outlet />
    </>
  )
}
