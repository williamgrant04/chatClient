import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/_servers')({
  component: Layout,
})

function Layout() {
  return(
    <div>
      <h1>temp</h1>
      <Outlet />
    </div>
  )
}
