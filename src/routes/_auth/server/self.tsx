import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/server/self')({
  component: RouteComponent,
})

function RouteComponent() {
  return 'Hello /_auth/self!'
}
