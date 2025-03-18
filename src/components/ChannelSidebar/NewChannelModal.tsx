import ReactModal from "react-modal"
import { createChannel } from "../../utils/ChatAPI"
import styled from "styled-components"
import { memo, useState } from "react"
import Modal from "../UI/Modal"
import Loader from "../UI/Loader"

const CreateChannelModal = memo(function CreateChannelModal({ setOpen, open, server }: { setOpen: React.Dispatch<React.SetStateAction<boolean>>, open: boolean, server: Server }) {
  ReactModal.setAppElement("#root")
  const [error, setError] = useState("")
  const [channelName, setChannelName] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleChannelSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (error) setError("")

    if (!channelName) {
      setError("Please enter a channel name")
    } else if (channelName.length < 3) {
      setError("Name too short")
    } else if (channelName.length > 50) {
      setError("Name too long")
    } else {
      setIsLoading(true)
      try {
        await createChannel(channelName, server.id)
        setOpen(false)
        resetFields()
      } catch (error: any) {
        setError(error.errors[0]) // Most likely to be "name can't be blank" or similar
      }
      setIsLoading(false)
    }
  }

  const resetFields = () => {
    setChannelName("")
    setError("")
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError("")
    setChannelName(e.target.value)
  }

  return (
    <Modal open={open} setOpen={setOpen} onBeforeClose={resetFields}>
      <Header>
        <h1>Create a new channel</h1>
        <h3>A new place for messages, give it a name</h3>
      </Header>

      <ChannelForm onSubmit={handleChannelSubmit}>
        <ChannelInput type="text" placeholder="Channel name" name="channel" value={channelName} onChange={handleInputChange} />
        { error && <p>{error}</p> }
        <CreateButton>
          { isLoading ? (
            <Loader borderSize={4}/>
          ):(
            "Create"
          )}
        </CreateButton>
      </ChannelForm>
    </Modal>
  )
})

const Header = styled.header`
  width: 60%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;

  h1, h3 { margin: 5px 0; }

  h3 {
    width: 60%;
    text-align: center;
  }
`

const ChannelForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 100%;

  p { margin: 0 }
`

const ChannelInput = styled.input`
  height: 1.6rem;
  width: 40%;
  font-size: 1.1rem;
  padding: 10px 20px;
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

const CreateButton = styled.button`
  height: 2em;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  padding: 5px 10px;
  width: 6em;
  background-color: black;
  color: white;
  border-radius: 8px;
  cursor: pointer;
  transition: 0.3s;
  border: none;

  &:hover {
    background-color: #909090;
    color: black;
    border-radius: 5px;
    transform: scale(1.1);
  }
`

export default CreateChannelModal
