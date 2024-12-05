import { Server } from "../../APITypes"

const ServerHover = ({ server, show }: {server: Server, show: boolean}) => {

  return (
    <div style = {{ display: show ? "block" : "none" }}>
      <h1>{server.name}</h1>
      <p>{server.created}</p>
    </div>
  )
}

export default ServerHover
