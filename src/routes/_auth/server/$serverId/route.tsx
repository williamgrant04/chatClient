import { createFileRoute, Outlet, } from '@tanstack/react-router'
import ChannelSidebar from '../../../../components/ChannelSidebar/ChannelSidebar'
import { getChannels, getServer } from '../../../../utils/ChatAPI'
import { Channel, Server } from '../../../../utils/APITypes'
import styled from 'styled-components'
import { useState } from 'react'

export const Route = createFileRoute('/_auth/server/$serverId')({
  loader: async () => {
    const params = window.location.pathname.split('/')
    const channels = await getChannels(params[2]) // $serverId
    const server = await getServer(params[2]) // $serverId
    return { ...channels, ...server }
  },
  component: ChannelLayout,
})

function ChannelLayout() {
  const [height, setHeight] = useState(window.innerHeight)
  window.addEventListener('resize', () => setHeight(window.innerHeight)) // This is probably the worst solution to this problem, but it works
  const loaderData = Route.useLoaderData() as { channels: Channel[], server: Server }

  return (
    <MainWrapper $height={height}>
      <ChannelSidebar channels={loaderData.channels} server={loaderData.server}/>
      <Outlet />
    </MainWrapper>
  )
}

const MainWrapper = styled.div<{ $height: number }>`
  display: flex;
  height: ${({ $height }) => $height - 70}px;
`
