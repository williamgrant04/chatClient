import { useContext, useState } from "react"
import ServerHover from "./ServerHover"
import { Link, useParams } from "@tanstack/react-router"
import styled from "styled-components"
import { AdvancedImage } from "@cloudinary/react"
import cloudinaryContext from "../../context/CloudinaryContext"

const ServerIcon = ({ server }: { server: Server }) => {
  const [show, setShow] = useState(false)
  const { cloud } = useContext(cloudinaryContext)
  const { serverId } = useParams({ from: "/_auth/server/$serverId" })

  return (
    <>
      {
        `${server.id}` === serverId ? (
          <ActiveServer onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)}>
            <Icon cldImg={cloud.image(server.image)} />
            <ServerHover server={server} show={show}/>
          </ActiveServer>
        ) : (
          <IconLink to={`/server/${server.id}/${server.defaultChannel.id}`} onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)} $active={`${server.id}` === serverId}>
            <Icon cldImg={cloud.image(server.image)} />
            <ServerHover server={server} show={show}/>
          </IconLink>
        )
      }
    </>
  )
}

const IconLink = styled(Link)<{ $active: boolean }>`
  position: relative;
  display: block;
  height: 50px;
  width: 50px;
  cursor: pointer;
  z-index: 2;

  &:hover {
    & > img {
      transform: scale(1.06);
      border-radius: 25%;
    }
  }
`

const ActiveServer = styled.div`
  position: relative;
  display: block;
  height: 50px;
  width: 50px;
  cursor: pointer;
  z-index: 2;

  & > img {
    transform: scale(1.06);
    border-radius: 25%;
  }
`

const Icon = styled(AdvancedImage)`
  border-radius: 50%;
  height: 50px;
  width: 50px;
  object-fit: cover;
  transition: 0.2s;
`

export default ServerIcon
