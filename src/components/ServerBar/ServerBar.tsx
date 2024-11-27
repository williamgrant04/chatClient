import ServerIcon from "./ServerIcon"
import DmIcon from "./DmIcon"
import NewServerIcon from "./NewServerIcon"

const ServerBar = (props: any) => {
  // console.log(props)

  return (
    <div style={{ display: "flex" }}>
      <DmIcon />
      <NewServerIcon />
      {
        props.servers.map((server: any) => {
          return (
            <ServerIcon key={server.id}/>
          )
        })
      }
    </div>
  )
}

export default ServerBar
