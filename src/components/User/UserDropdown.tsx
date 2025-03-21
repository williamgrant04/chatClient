import { useNavigate } from "@tanstack/react-router"
import { logout } from "../../utils/ChatAPI"
import styled from "styled-components"
import { useClickOutside } from "../../hooks/useClickOutside"
import { useRef, useState } from "react"
import StatusModal from "./StatusModal"
import { AnimatePresence, motion } from "motion/react"

const UserDropDown = ({ open, setOpen }: { open: boolean, setOpen: any }) => {
  const navigate = useNavigate()
  const dropDownRef = useRef<HTMLDivElement>(null)
  useClickOutside(dropDownRef, () => setOpen(false))
  const [statusOpen, setStatusOpen] = useState(false)

  const handleLogout = () => {
    logout()
    navigate({ to: '/' })
  }

  return (
    <>
      <AnimatePresence>
        {
          open &&
          <Dropdown open={open} ref={dropDownRef} as={motion.div} animate={{ right: "0" }} exit={{ right: "-200px" }}>
            <DropdownButton onClick={() => setStatusOpen(true)}>Edit status</DropdownButton>
            <DropdownButton>!Settings!</DropdownButton>
            <DropdownButton onClick={handleLogout}>Log out</DropdownButton>
          </Dropdown>
        }
      </AnimatePresence>
      <StatusModal open={statusOpen} setOpen={setStatusOpen}/>
    </>
  )
}

const Dropdown = styled.div<{ open: boolean }>`
  display: flex;
  position: absolute;
  top: 100%;
  right: -200px;
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
