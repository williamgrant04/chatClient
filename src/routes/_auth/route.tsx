import { createFileRoute, Outlet, useNavigate } from '@tanstack/react-router'
import { loggedin } from '../../utils/ChatAPI'
import { useContext, useEffect } from 'react'
import userContext from '../../context/UserContext'

export const Route = createFileRoute('/_auth')({
  loader: async () => {
    const res = await loggedin()
    return res
  },
  component: AuthLoader,
})

function AuthLoader() {
  const navigate = useNavigate()
  const user = useContext(userContext)
  const loaderData = Route.useLoaderData()

  useEffect(() => {
    if (!loaderData.logged_in && window.location.pathname !== '/') {
      user.setUser(undefined)
      navigate({ to: '/' })
    } else if (loaderData.logged_in && window.location.pathname === '/') {
      user.setUser(loaderData.user!) // Non-null assertion here because the above condition checks this, if this is null something went really wrong
      navigate({ to: '/server/self' })
    }
  }, [])

  return <Outlet />
}
