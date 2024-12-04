import ServerIcon from "./ServerIcon"
import DmIcon from "./DmIcon"
import NewServerIcon from "./NewServerIcon"
import { Server } from "../../utils/APITypes"
import UserDetails from "../User/UserDetails"
import styled from "styled-components"

const ServerBar = ({ servers }: { servers: Server[] }) => {
  return (
    <ServerBarWrapper>
      <DmIcon />
      <NewServerIcon />
      <div style={{ display: "flex", gap: "10px" }}>
        {
          servers.map((server: Server) => {
            return (
              <ServerIcon key={server.id} server={server}/>
            )
          })
        }
      </div>
      <UserDetails />
    </ServerBarWrapper>
  )
}

const ServerBarWrapper = styled.div`
  background-color: #a0a0a0;
  display: grid;
  grid-template-columns: auto auto 1fr auto;
  align-items: center;
  gap: 10px;
  width: auto;
  padding: 10px;
`

export default ServerBar
