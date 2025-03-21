import styled from "styled-components";
import { faCheck } from "@fortawesome/free-solid-svg-icons/faCheck"
import { faXmark } from "@fortawesome/free-solid-svg-icons/faXmark"
import { forwardRef, useState } from "react";
import MessageAction from "./MessageAction";

interface EditMessageProps {
  onEdit: (content: string) => void,
  onCancel: () => void,
  message: Message
}

const EditMessage = forwardRef<HTMLFormElement, EditMessageProps>(function EditMessage({ onEdit, onCancel, message }, ref){
  const [content, setContent] = useState(message.content)

  // This is just so that pressing enter also submits the edit
  const editSubmitHandler = (e: React.FormEvent) => {
    e.preventDefault()
    onEdit(content)
  }

  return (
    <MessageEdit ref={ref} onSubmit={editSubmitHandler}>
      <MessageInput type="text" value={content} onChange={ (e) => setContent(e.target.value) } />
      <MessageActions>
        <MessageAction onClick={() => onEdit(content)} icon={faCheck} />
        <MessageAction onClick={onCancel} icon={faXmark} />
      </MessageActions>
    </MessageEdit>
  )
})

const MessageEdit = styled.form`
  position: relative;
  display: flex;
  align-items: center;
  height: 32px;
  width: 100%;
`

const MessageInput = styled.input`
  box-sizing: border-box;
  padding: 5px 10px;
  font-size: 1.1rem;
  border-radius: 10px 0 0 10px;
  border: none;
  outline: none;
  transition: 0.3s;
  height: 100%;
  width: 100%;

  &:focus {
    border-radius: 5px 0 0 5px;
  }
`

const MessageActions = styled.div`
  box-sizing: border-box;
  display: flex;
  height: 100%;

  & > button:first-child {
    border-radius: 0;
  }
`

export default EditMessage;
