import { createFileRoute, Outlet } from '@tanstack/react-router'
import ServerBar from '../../../components/ServerBar/ServerBar'
import { getServers } from '../../../utils/ChatAPI'

export const Route = createFileRoute('/_auth/_servers')({
  loader: async () => {
    const data = await getServers() as any
    return data.servers
  },
  component: Layout
})

function Layout() {
  const loaderData = Route.useLoaderData()

  return(
    <div>
      <ServerBar servers={loaderData}/>
      <h1>temp</h1>
      <Outlet />
    </div>
  )
}
