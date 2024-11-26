import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/_servers/self')({
  component: RouteComponent,
})

function RouteComponent() {
  return 'Hello /_auth/self!'
}
