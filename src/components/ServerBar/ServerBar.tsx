import ServerIcon from "./ServerIcon"
import DmIcon from "./DmIcon"
import NewServerIcon from "./NewServerIcon"
import { Server } from "../../utils/APITypes"

const ServerBar = ({ servers }: { servers: Server[] }) => {
  // console.log(props)

  return (
    <div style={{ display: "flex" }}>
      <DmIcon />
      <NewServerIcon />
      {
        servers.map((server: Server) => {
          return (
            <ServerIcon key={server.id} server={server}/>
          )
        })
      }
    </div>
  )
}

export default ServerBar
