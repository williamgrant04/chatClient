import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/server/$serverId/$channelId')({
  component: RouteComponent,
})

function RouteComponent() {
  return 'Hello /_auth/_servers/server/channel!'
}
