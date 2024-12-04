import { useState } from "react"
import ServerHover from "./ServerHover"
import { Link } from "@tanstack/react-router"
import { Server } from "../../utils/APITypes"
import styled from "styled-components"

const ServerIcon = ({ server }: { server: Server }) => {
  const [show, setShow] = useState(false)

  return (
    <Wrapper onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)}>
      <IconLink to={`/server/${server.id}/${server.defaultChannel.id}`}>
        {/* TODO: implement actual server icons instead of placeholders */}
        <Icon src="https://placehold.co/50" alt={server.name} />
      </IconLink>
      <ServerHover server={server} show={show}/>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  height: 50px;
  width: 50px;
`

const IconLink = styled(Link)`
  display: block;
  height: 50px;
  width: 50px;
`

const Icon = styled.img`
  height: 50px;
  width: 50px;
  border-radius: 10px;
  cursor: pointer;
  transition: 0.2s;

  &:hover {
    transform: scale(1.06); // Subtle effect, 1.1 would be too much
    border-radius: 5px;
  }
`

export default ServerIcon
