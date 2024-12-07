import styled from "styled-components"
import { editMessage } from "../../../utils/ChatAPI"
import { useContext, useEffect, useRef, useState } from "react"
import { createConsumer } from "@rails/actioncable"
import { useParams } from "@tanstack/react-router"
import userContext from "../../../context/UserContext"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPen } from "@fortawesome/free-solid-svg-icons/faPen"
import { faMinus } from "@fortawesome/free-solid-svg-icons/faMinus"
import { faCheck } from "@fortawesome/free-solid-svg-icons/faCheck"
import { faXmark } from "@fortawesome/free-solid-svg-icons/faXmark"


const cable = createConsumer("ws://localhost:3000/cable")

const Message = ({ message }: { message: Message }) => {
  const user = useContext(userContext)
  const params = useParams({ from: "/_auth/server/$serverId/$channelId" })
  const [isEditing, setIsEditing] = useState(false)
  const [content, setContent] = useState(message.content)
  const [hovering, setHovering] = useState(false)
  const editRef = useRef<HTMLDivElement>(null)
  const date = new Date(message.created_at)

  // I want to find a way to not have to create 2 subscriptions
  const handleEditClick = () => {
    setIsEditing(true)
    setContent(message.content)
    cable.subscriptions.create({ channel: "ChannelChannel", id: params.channelId }, { received:
      (data: { edit: boolean, message: Message }) => {
        if (data.edit && data.message.id === message.id) {
          setContent(data.message.content)
        }
      }
    })
  }

  useEffect(() => {
    editRef.current?.scrollIntoView({ behavior: "smooth" })

    if (isEditing) document.addEventListener("keydown", function cancel(e: KeyboardEvent) {
      if (e.key === "Escape") {
        handleCancelEdit()
        document.removeEventListener("keydown", cancel)
      }
    })
  }, [isEditing])

  const handleCancelEdit = () => {
    setIsEditing(false)
    cable.disconnect()
  }

  useEffect(() => {
    return () => {
      cable.disconnect()
    }
  }, [])

  const handleMessageEdit = async () => {
    try {
      await editMessage(content, message.id)
      setIsEditing(false)
      cable.disconnect()
    } catch (err: any) {
      // The error will be because the message content is empty, so I don't want to close the edit box
    }
  }

  return (
    <MessageWrapper onMouseEnter={()=>setHovering(true)} onMouseLeave={()=>setHovering(false)}>
      <MessageDetails>
        <h3>{message.author.username}</h3>
        <p>{date.toDateString()}</p>
      </MessageDetails>
      {isEditing ?
        <MessageEdit ref={editRef}>
          <MessageInput type="text" value={content} onChange={ (e) => setContent(e.target.value) }/>
          <div>
            <Action onClick={handleMessageEdit}>
              <FontAwesomeIcon icon={faCheck} />
            </Action>
            <Action onClick={handleCancelEdit}>
              <FontAwesomeIcon icon={faXmark} />
            </Action>
          </div>
        </MessageEdit>
        : <p>{content}</p>}
      {message.author.id === user.user?.id && !isEditing && // Only show the edit button if the user is the author of the message
      <MessageActions $hovering={hovering}>
        <Action onClick={handleEditClick}>
          <FontAwesomeIcon icon={faPen} />
        </Action>
        {/* This will be a delete button */}
        <Action onClick={() => {}}>
          <FontAwesomeIcon icon={faMinus} />
        </Action>
      </MessageActions>}
    </MessageWrapper>
  )
}

const MessageWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 5px 20px 5px 30px;
  margin: 5px 0;
  width: -webkit-fill-available;
  white-space: pre-wrap;
  word-wrap: break-word;
  transition: 0.1s;

  h3, p { margin: 0; }

  &:hover {
    background-color: #d0d0d0;
  }
`

const MessageDetails = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  margin-bottom: 5px;

  p {
    color: #5f5f5f;
    font-size: 0.8rem;
    font-style: italic;
  }
`

const MessageActions = styled.div<{ $hovering: boolean }>`
  display: ${({ $hovering }) => $hovering ? "flex" : "none"};
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
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

export default Message
