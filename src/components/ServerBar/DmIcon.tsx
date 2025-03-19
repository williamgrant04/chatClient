import { Link } from "@tanstack/react-router"
import styled from "styled-components"

const DmIcon = () => {
  const pathname = window.location.pathname

  return (
    <>
      {
        pathname === "/server/self" ? (
          <Icon src="https://placehold.co/50" alt="dm icon" $active={pathname === "/server/self"}/>
        ) : (
          <IconLink to="/server/self">
            <Icon src="https://placehold.co/50" alt="dm icon" />
          </IconLink>
        )
      }
    </>
  )
}

const IconLink = styled(Link)`
  display: block;
  height: 50px;
  width: 50px;
`

const Icon = styled.img<{ $active?: boolean }>`
  height: 50px;
  width: 50px;
  cursor: pointer;
  transition: 0.2s;
  border-radius: ${({ $active }) => $active ? "25%" : "50%" };
  transform: ${({ $active }) => $active ? "scale(1.06)" : "none" };

  &:hover {
    transform: scale(1.06);
    border-radius: 25%;
  }
`

export default DmIcon
