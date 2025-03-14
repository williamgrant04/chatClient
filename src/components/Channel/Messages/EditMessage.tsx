import styled from "styled-components";
import { faCheck } from "@fortawesome/free-solid-svg-icons/faCheck"
import { faXmark } from "@fortawesome/free-solid-svg-icons/faXmark"
import { forwardRef, useEffect, useState } from "react";
import { useParams } from "@tanstack/react-router";
import { createConsumer } from "@rails/actioncable";
import MessageAction from "./MessageAction";


const cable = createConsumer("ws://localhost:3000/cable")

interface EditMessageProps {
  onEdit: (content: string) => void,
  onEditSuccess: (content: string) => void,
  onCancel: () => void,
  message: Message
}

const EditMessage = forwardRef<HTMLDivElement, EditMessageProps>(function EditMessage({ onEdit, onEditSuccess, onCancel, message }, ref){
  const [content, setContent] = useState(message.content)
  const { channelId } = useParams({ from: "/_auth/server/$serverId/$channelId" })
  useEffect(() => {
    cable.subscriptions.create({ channel: "MessageChannel", id: channelId }, { received:
      (data: { edit: boolean, message: Message }) => {
        if (data.edit && data.message.id === message.id) {
          onEditSuccess(data.message.content)
        }
      }
    })

    return () => cable.disconnect()
  }, [])

  return (
    <MessageEdit ref={ref}>
      <MessageInput type="text" value={content} onChange={ (e) => setContent(e.target.value) } />
      <MessageActions>
        <MessageAction onClick={() => onEdit(content)} icon={faCheck} />
        <MessageAction onClick={onCancel} icon={faXmark} />
      </MessageActions>
    </MessageEdit>
  )
})

const MessageEdit = styled.div`
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
`

export default EditMessage;
