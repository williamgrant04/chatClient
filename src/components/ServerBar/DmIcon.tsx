import { Link } from "@tanstack/react-router"
import styled from "styled-components"

const DmIcon = () => {
  return (
    <div>
      <IconLink to="/server/self">
        <Icon src="https://placehold.co/50" alt="dm icon" />
      </IconLink>
    </div>
  )
}

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

export default DmIcon
