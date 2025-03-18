import { useContext, useRef, useState } from "react"
import userContext from "../../context/UserContext"
import UserDropDown from "./UserDropdown"
import styled from "styled-components"
import { AdvancedImage } from '@cloudinary/react'
import cloudinaryContext from "../../context/CloudinaryContext"
import { useClickOutside } from "../../hooks/useClickOutside"

const UserDetails = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const { user } = useContext(userContext)
  const { cloud } = useContext(cloudinaryContext)
  const dropDownRef = useRef<HTMLDivElement>(null)
  useClickOutside(dropDownRef, () => setDropdownOpen(false))

  return (
    <>
      <Wrapper onClick={() => { setDropdownOpen(!dropdownOpen) }} ref={dropDownRef}>
        <AdvancedImage cldImg={cloud.image(user?.image)}  />
        <p>{user?.username}</p>
      </Wrapper>
      <UserDropDown open={dropdownOpen}/>
    </>
  )
}

const Wrapper = styled.div`
  justify-self: end;
  background-color: #ddd;
  border-radius: 10px;
  padding: 5px 10px;
  font-size: 1.25rem;
  display: flex;
  align-items: center;
  gap: 10px;
  transition: 0.3s;

  &:hover {
    cursor: pointer;
    transform: scale(1.05);
    border-radius: 5px;
  }

  p { margin: 0; }

  img {
    height: 40px;
    width: 40px;
    object-fit: cover;
    border-radius: 50%;
  }
`

export default UserDetails
