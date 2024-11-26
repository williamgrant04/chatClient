import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'
import { loggedin } from '../../utils/ChatAPI'

export const Route = createFileRoute('/_auth')({
  beforeLoad: async () => {
    const res = await loggedin()
    if (!res.logged_in && window.location.pathname !== '/') {
      throw redirect({ to: '/' })
    } else if (res.logged_in && window.location.pathname === '/') {
      throw redirect({ to: '/self' })
    }
  },
  component: RouteComponent,
})

function RouteComponent() {
  return <Outlet />
}
