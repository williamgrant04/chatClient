import React, { useState } from "react"
import ReactModal from 'react-modal'
import { newServer } from "../../utils/ChatAPI"
import styled from "styled-components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlus } from "@fortawesome/free-solid-svg-icons/faPlus"


const NewServerIcon = () => {
  ReactModal.setAppElement("#root")
  const [modalOpen, setModalOpen] = useState(false)
  const [serverName, setServerName] = useState("")

  const handleModalClick = () => {
    setServerName("")
    setModalOpen(!modalOpen)
  }

  const handleServerSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await newServer(serverName)
    setModalOpen(false)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setServerName(e.target.value)
  }

  return (
    <>
      <ReactModal isOpen={modalOpen}>
        <h2>Create a new server</h2>
        <p onClick={handleModalClick}>X</p> {/* Temporary close button */}
        <form onSubmit={handleServerSubmit}>
          <input type="text" placeholder="Server name" value={serverName} onChange={handleInputChange} />
          <input type="submit" value="Create" />
        </form>
      </ReactModal>
      <Wrapper onClick={handleModalClick}>
          <Icon aria-hidden="false" width="50" height="50" viewBox="0 0 50 50">
            <FontAwesomeIcon icon={faPlus} />
          </Icon>
      </Wrapper>
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
