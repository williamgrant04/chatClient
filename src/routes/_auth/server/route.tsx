import { createFileRoute, Outlet } from '@tanstack/react-router'
import ServerBar from '../../../components/ServerBar/ServerBar'
import { getServers } from '../../../utils/ChatAPI'

export const Route = createFileRoute('/_auth/server')({
  loader: async () => {
    const data = (await getServers()) as any
    return data.servers
  },
  component: Layout,
})

function Layout() {
  const loaderData = Route.useLoaderData()

  return (
    <div>
      <ServerBar servers={loaderData} />
      <Outlet />
    </div>
  )
}
