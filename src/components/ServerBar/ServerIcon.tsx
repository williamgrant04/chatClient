import { useState } from "react"
import ServerHover from "./ServerHover"
import { Link } from "@tanstack/react-router"

const ServerIcon = ({ server }: { server: any }) => {
  const [show, setShow] = useState(false)

  return (
    <div onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)}>
      <Link to={`/server/${server.id}/${server.defaultChannel.id}`}>
        <img src="https://placehold.co/50" alt={server.name} />
      </Link>
      <ServerHover server={server} show={show}/>
    </div>
  )
}

export default ServerIcon
