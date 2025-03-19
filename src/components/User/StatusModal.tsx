import { useContext, useEffect, useState } from "react";
import Modal from "../UI/Modal";
import userContext from "../../context/UserContext";
import styled from "styled-components";
import { newStatus } from "../../utils/ChatAPI";

interface StatusModalProps {
  open: boolean,
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const StatusModal = ({ open, setOpen }: StatusModalProps) => {
  const { user, setUser } = useContext(userContext)
  const [status, setStatus] = useState("initial")

  useEffect(() => {
    if (user?.status) setStatus(user?.status)

    return () => setStatus("")
  }, [open])

  const statusSubmitHandler = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      await newStatus(status)
      setUser(prevUser => { if (prevUser) return { ...prevUser, status } })
      setOpen(false)
    } catch (e) {
      console.log(e);

    }
  }

  return (
    <Modal {...{open}} {...{setOpen}}>
      <Header>
        <h1>Set status</h1>
        <h3>Give yourself a little tag.</h3>
      </Header>

      <Form onSubmit={statusSubmitHandler}>
        <label htmlFor="status" hidden>Set status</label>
        <StatusInput type="text" placeholder="Set status..." id="status" onChange={(e) => setStatus(e.target.value)} value={status} />
        <Save>Save</Save>
      </Form>
    </Modal>
  )
}

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 100%;

  p { margin: 0 }
`

const Header = styled.header`
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

const StatusInput = styled.input`
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

const Save = styled.button`
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

export default StatusModal;
