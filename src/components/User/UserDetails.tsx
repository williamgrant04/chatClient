import { useContext, useState } from "react"
import userContext from "../../context/UserContext"
import UserDropDown from "./UserDropdown"
import styled from "styled-components"
import { AdvancedImage } from '@cloudinary/react'
import cloudinaryContext from "../../context/CloudinaryContext"

const UserDetails = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const { user } = useContext(userContext)
  const { cloud } = useContext(cloudinaryContext)

  // TODO: Fix dropdown closing then immediately opening again when clicking on wrapper while it's open
  // This is due to useClickOutside recognising that an element other than the dropdown has been clicked, so it closes it
  // but the wrapper just opens it again because of the click listener
  return (
    <>
      <Wrapper onClick={() => { setDropdownOpen(prevDropdown => !prevDropdown) }}>
        <AdvancedImage cldImg={cloud.image(user?.image)} />
        <TextWrapper>
          <p>{user?.username}</p>
          <Status>{user?.status}</Status>
        </TextWrapper>
      </Wrapper>
      <UserDropDown open={dropdownOpen} setOpen={setDropdownOpen}/>
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
  max-width: 10rem;

  &:hover {
    cursor: pointer;
    transform: scale(1.05);
    border-radius: 5px;
  }

  p { margin: 0; }

  img {
    height: 40px;
    min-width: 40px;
    max-width: 40px;
    object-fit: cover;
    border-radius: 50%;
  }
`

const TextWrapper = styled.div`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`

const Status = styled.p`
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 0.8rem;
`

export default UserDetails
