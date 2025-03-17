import ReactModal from "react-modal"
import { createChannel } from "../../utils/ChatAPI"
import styled from "styled-components"
import { memo, useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faXmarkCircle } from "@fortawesome/free-regular-svg-icons"

const CreateChannelModal = memo(function CreateChannelModal({ setOpen, open, server }: { setOpen: React.Dispatch<React.SetStateAction<boolean>>, open: boolean, server: Server }) {
  ReactModal.setAppElement("#root")
  const [error, setError] = useState("")
  const [channelName, setChannelName] = useState("")

  const handleChannelSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (error) setError("")

    if (!channelName) {
      setError("Please enter a channel name")
    } else if (channelName.length < 3) {
      setError("Name too short")
    } else if (channelName.length < 50) {
      setError("Name too long")
    } else {
      try {
        await createChannel(channelName, server.id)
        setOpen(false)
        setChannelName("")
      } catch (error: any) {
        setError(error.errors[0]) // Most likely to be "name can't be blank" or similar
      }
    }
  }

  const handleClose = () => {
    setOpen(false)
    setChannelName("")
    setError("")
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError("")
    setChannelName(e.target.value)
  }

  return (
    <Modal isOpen={open} style={{ overlay: { backgroundColor: "rgb(0, 0, 0, 0.5)", zIndex: 3 } }} onRequestClose={() => setOpen(false)}>
      <CloseButton onClick={handleClose}>
        <FontAwesomeIcon icon={faXmarkCircle} />
      </CloseButton>
      <h2>Create a new channel</h2>
      <ChannelForm onSubmit={handleChannelSubmit}>
        <ChannelInput type="text" placeholder="Channel name" name="channel" value={channelName} onChange={handleInputChange} />
        <input type="submit" value="Create" id="newchannelsubmit" hidden/>
      </ChannelForm>
      {error && <p>{error}</p>}
      <CreateButton role="button" tabIndex={0} htmlFor="newchannelsubmit">Create</CreateButton>
    </Modal>
  )
})

const Modal = styled(ReactModal)`
  outline: 0;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  border-radius: 10px;
  padding: 20px;
  width: 400px;
  height: 200px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 3;

  h2 {
    margin: 0;
    margin-bottom: 10px;
  }
`

const ChannelForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
`

const ChannelInput = styled.input`
  padding: 5px 10px;
  border-radius: 10px;
  border: none;
  outline: 0;
  background-color: #f0f0f0;
  transition: 0.3s;

  &:focus {
    border-radius: 5px;
    background-color: #e0e0e0;
  }
`

const CreateButton = styled.label`
  padding: 5px 10px;
  background-color: black;
  color: white;
  border-radius: 10px;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    background-color: #909090;
    color: black;
    border-radius: 5px;
    transform: scale(1.1);
  }
`

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  height: 30px;
  width: 30px;
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-size: 1.6rem;
  color: #000;
  transition: 0.3s;
  padding: 0;
  border-radius: 50%;

  svg {
    height: 30px;
    width: 30px;
  }

  &:hover {
    transform: scale(1.1);
    background-color: #f0f0f0;
    color: #909090;
  }
`

export default CreateChannelModal
