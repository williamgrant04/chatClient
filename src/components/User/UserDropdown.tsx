import { useNavigate } from "@tanstack/react-router"
import { logout } from "../../utils/ChatAPI"
import styled from "styled-components"

const UserDropDown = ({ open }: { open: boolean }) => {
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate({ to: '/' })
  }

  return (
    <Dropdown open={open}>
      <DropdownButton>!Edit status!</DropdownButton>
      <DropdownButton>!Settings!</DropdownButton>
      <DropdownButton onClick={handleLogout}>Log out</DropdownButton>
    </Dropdown>
  )
}

const Dropdown = styled.div<{ open: boolean }>`
  display: flex;
  position: absolute;
  top: 100%;
  right: ${props => props.open ? "0" : "-200px"};
  box-shadow: 0px 0px 4px #a0a0a0;
  background-color: #ddd;
  width: 120px;
  flex-direction: column;
  align-items: center;
  padding: 15px;
  z-index: 1;
  gap: 6px;
  transition: 0.4s cubic-bezier(0.22, 0.61, 0.36, 1);
  border-bottom-left-radius: 10px;
`

const DropdownButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  padding: 5px;
  border-radius: 5px;
  font-size: 1.2rem;
  transition: 0.3s;
  width: 100%;

  &:hover {
    background-color: #a0a0a0;
  }
`

export default UserDropDown
