import { useContext, useState } from "react"
import ServerHover from "./ServerHover"
import { Link } from "@tanstack/react-router"
import styled from "styled-components"
import { AdvancedImage } from "@cloudinary/react"
import cloudinaryContext from "../../context/CloudinaryContext"

const ServerIcon = ({ server }: { server: Server }) => {
  const [show, setShow] = useState(false)
  const { cloud } = useContext(cloudinaryContext)

  return (
    <IconLink to={`/server/${server.id}/${server.defaultChannel.id}`} onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)}>
      <Icon cldImg={cloud.image(server.image)} />
      <ServerHover server={server} show={show}/>
    </IconLink>
  )
}

const IconLink = styled(Link)`
  position: relative;
  display: block;
  height: 50px;
  width: 50px;
`

const Icon = styled(AdvancedImage)`
  height: 50px;
  width: 50px;
  border-radius: 50%;
  cursor: pointer;
  object-fit: cover;
  transition: 0.2s;

  &:hover {
    transform: scale(1.06); // Subtle effect, 1.1 would be too much
    border-radius: 5px;
  }
`

export default ServerIcon
