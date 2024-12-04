import { useContext, useState } from "react"
import userContext from "../../context/UserContext"
import UserDropDown from "./UserDropdown"
import styled from "styled-components"

const UserDetails = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const user = useContext(userContext)

  return (
    <>
      <Wrapper>
        {/* todo: create user profile picture, and maybe a status thing like discord? Not sure, just need more things to put here */}
        <p style={{ margin: 0 }} onClick={() => { setDropdownOpen(!dropdownOpen) }}>{user.user?.username}</p>
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
  transition: 0.3s;

  &:hover {
    cursor: pointer;
    transform: scale(1.05);
    border-radius: 5px;
  }
`

export default UserDetails
