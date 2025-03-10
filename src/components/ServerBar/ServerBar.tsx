import ServerIcon from "./ServerIcon"
import DmIcon from "./DmIcon"
import NewServerIcon from "./NewServerIcon"
import UserDetails from "../User/UserDetails"
import styled from "styled-components"
import { useEffect, useState } from "react"
import { createConsumer } from "@rails/actioncable"

const cable = createConsumer("ws://localhost:3000/cable")

const ServerBar = (props: { servers: Server[] }) => {
  const [servers, setServers] = useState(props.servers)

  useEffect(() => {
    cable.subscriptions.create({ channel: "ServerChannel" }, { received: (data: Server) => {
      setServers(prevServers => [ ...prevServers, data ])
    }})

    return () => cable.disconnect()
  }, [])

  return (
    <ServerBarWrapper>
      <DmIcon />
      <NewServerIcon />
      <div style={{ display: "flex", gap: "10px" }}>
        {
          servers.map((server: Server) => {
            return (
              <ServerIcon key={server.id} server={server} />
            )
          })
        }
      </div>
      <UserDetails />
    </ServerBarWrapper>
  )
}

const ServerBarWrapper = styled.div`
  position: relative;
  background-color: #a0a0a0;
  display: grid;
  grid-template-columns: auto auto 1fr auto;
  align-items: center;
  gap: 10px;
  width: auto;
  padding: 10px;
`

export default ServerBar
