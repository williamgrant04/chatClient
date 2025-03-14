import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCheck } from "@fortawesome/free-solid-svg-icons/faCheck"
import { faXmark } from "@fortawesome/free-solid-svg-icons/faXmark"
import { forwardRef, useEffect, useState } from "react";
import { useParams } from "@tanstack/react-router";
import { createConsumer } from "@rails/actioncable";


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
      <MessageInput type="text" value={content} onChange={ (e) => setContent(e.target.value) }/>
      <div>
        <Action onClick={() => onEdit(content)}>
          <FontAwesomeIcon icon={faCheck} />
        </Action>
        <Action onClick={onCancel}>
          <FontAwesomeIcon icon={faXmark} />
        </Action>
      </div>
    </MessageEdit>
  )
})

const MessageEdit = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #f0f0f0;
  padding: 10px 15px;
  border-radius: 10px;

  div { align-self: flex-end; }
`

const MessageInput = styled.input`
  padding: 5px 10px;
  font-size: 1.1rem;
  border-radius: 10px;
  border: none;
  outline: none;
  transition: 0.3s;
  margin-bottom: 5px;

  &:focus {
    border-radius: 5px;
  }
`

const Action = styled.button`
  background-color: black;
  border: none;
  cursor: pointer;
  color: #f0f0f0;
  transition: 0.3s;
  padding: 5px 10px;

  &:first-child {
    border-radius: 10px 0 0 10px;
  }

  &:last-child {
    border-radius: 0 10px 10px 0;
  }

  &:hover {
    background-color: #909090;
    color: black;
  }
`

export default EditMessage;
