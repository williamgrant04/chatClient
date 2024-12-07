import { useState } from "react"
import styled from "styled-components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlus } from "@fortawesome/free-solid-svg-icons/faPlus"
import NewServerModal from "./NewServerModal"

const NewServerIcon = () => {
  const [modalOpen, setModalOpen] = useState(false)
  const [serverName, setServerName] = useState("")

  const handleModalClick = () => {
    setServerName("")
    setModalOpen(true)
  }

  return (
    <>
      <Wrapper onClick={handleModalClick}>
        <Icon aria-hidden="false" width="50" height="50" viewBox="0 0 50 50">
          <FontAwesomeIcon icon={faPlus} />
        </Icon>
      </Wrapper>
      <NewServerModal setOpen={setModalOpen} open={modalOpen} setServerName={setServerName} serverName={serverName}/>
    </>
  )
}

const Wrapper = styled.div`
  height: 50px;
  width: 50px;
`

const Icon = styled.svg`
  background-color: #ddd;
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

export default NewServerIcon
