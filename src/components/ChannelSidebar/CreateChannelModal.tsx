import ReactModal from "react-modal"
import { createChannel } from "../../utils/ChatAPI"
import styled from "styled-components"
import { memo, useState } from "react"
import Modal from "../UI/Modal"

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError("")
    setChannelName(e.target.value)
  }

  return (
    <Modal open={open} setOpen={setOpen}>
      <h2>Create a new channel</h2>
      <ChannelForm onSubmit={handleChannelSubmit}>
        <ChannelInput type="text" placeholder="Channel name" name="channel" value={channelName} onChange={handleInputChange} />
        { error && <p>{error}</p> }
        <CreateButton type="submit" value="Create" />
      </ChannelForm>
    </Modal>
  )
})

const ChannelForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;

  p { margin: 0 }
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

const CreateButton = styled.input`
  padding: 5px 10px;
  background-color: black;
  color: white;
  border: none;
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

export default CreateChannelModal
