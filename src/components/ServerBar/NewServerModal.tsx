import ReactModal from "react-modal"
import { newServer } from "../../utils/ChatAPI"
import styled from "styled-components"
import { forwardRef, useImperativeHandle, useRef, useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faXmarkCircle } from "@fortawesome/free-regular-svg-icons"

const NewServerModal = forwardRef<{ open: () => void }>(
  function NewServerModal(_props, ref) {
    ReactModal.setAppElement("#root")
    const [open, setOpen] = useState(false)
    const modalRef = useRef<ReactModal>(null)
    const [serverName, setServerName] = useState("")
    const [errors, setErrors] = useState<string[]>([])

    useImperativeHandle(ref, () => {
      return {
        open() {
          setOpen(true)
        }
      }
    })

    const handleServerSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      setErrors([])
      try {
        await newServer(serverName.trim())
        setOpen(false)
        setServerName("")
      } catch (error: any) {
        setErrors(error.errors)
      }
    }

    const handleClose = () => {
      setOpen(false)
      setServerName("")
      setErrors([])
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setServerName(e.target.value)
    }

    return (
      <Modal isOpen={open} style={{ overlay: { backgroundColor: "rgb(0, 0, 0, 0.5)", zIndex: 3 } }} ref={modalRef}>
        <CloseButton onClick={handleClose}>
          <FontAwesomeIcon icon={faXmarkCircle} />
        </CloseButton>
        <h2>Create a new server</h2>
        <ServerForm onSubmit={handleServerSubmit}>
          <ServerInput type="text" placeholder="Server name" name="server" value={serverName} onChange={handleInputChange} />
          <input type="submit" value="Create" id="newserversubmit" hidden/>
        </ServerForm>
        <p>{errors.join(", ")}</p>
        <CreateButton role="button" tabIndex={0} htmlFor="newserversubmit">Create</CreateButton>
      </Modal>
    )
  }
)
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

const ServerForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
`

const ServerInput = styled.input`
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

export default NewServerModal
