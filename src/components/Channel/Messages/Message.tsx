import styled from "styled-components"
import { editMessage } from "../../../utils/ChatAPI"
import { useContext, useEffect, useState } from "react"
import { createConsumer } from "@rails/actioncable"
import { useParams } from "@tanstack/react-router"
import userContext from "../../../context/UserContext"


const cable = createConsumer("ws://localhost:3000/cable")

const Message = ({ message }: { message: Message }) => {
  const params = useParams({ from: "/_auth/server/$serverId/$channelId" })
  const [isEditing, setIsEditing] = useState(false)
  const [content, setContent] = useState(message.content)
  const date = new Date(message.created_at)
  const user = useContext(userContext)

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
    <MessageWrapper>
      <MessageDetails>
        <h3>{message.author.username}</h3>
        <p>{date.toDateString()}</p>
      </MessageDetails>
      {isEditing ?
        <div>
          <input type="text" value={content} onChange={ (e)=> setContent(e.target.value) }/>
          <button onClick={handleMessageEdit}>save</button>
        </div>
        : <p>{content}</p>}
      {message.author.id === user.user?.id && // Only show the edit button if the user is the author of the message
      <div>
        <button onClick={handleEditClick}>edit</button>
      </div>}
    </MessageWrapper>
  )
}

const MessageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 5px 20px 5px 30px;
  margin: 5px 0;
  width: 100%;
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

export default Message
