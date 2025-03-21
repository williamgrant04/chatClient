import styled from "styled-components"
import { deleteMessage, editMessage } from "../../../utils/ChatAPI"
import { useContext, useEffect, useRef, useState } from "react"
import userContext from "../../../context/UserContext"
import { faPen } from "@fortawesome/free-solid-svg-icons/faPen"
import { faMinus } from "@fortawesome/free-solid-svg-icons/faMinus"
import { AdvancedImage } from "@cloudinary/react"
import cloudinaryContext from "../../../context/CloudinaryContext"
import EditMessage from "./EditMessage"
import MessageAction from "./MessageAction"
import { formatDate } from "../../../utils/dateFormatter"

const Message = ({ message }: { message: Message }) => {
  const { user } = useContext(userContext)
  const { cloud } = useContext(cloudinaryContext)
  const [isEditing, setIsEditing] = useState(false) // If the message is currently being edited
  const [content, setContent] = useState("")
  const [hovering, setHovering] = useState(false)
  const [edited, setEdited] = useState(false) // If the message has been edited
  const editRef = useRef<HTMLFormElement>(null)

  useEffect(() => {
    setContent(message.content)
    setEdited(message.edited)
  }, [message])

  useEffect(() => {
    editRef.current?.scrollIntoView({ behavior: "smooth" })

    if (isEditing) {
      (editRef.current?.children[0] as HTMLInputElement).focus() // Want to prevent needing another ref
      document.addEventListener("keydown", function cancel(e: KeyboardEvent) {
        if (e.key === "Escape") {
          setIsEditing(false)
          document.removeEventListener("keydown", cancel)
        }
      })
    }
  }, [isEditing])

  const editHandler = async (content: string) => {
    if (!content) return
    try {
      await editMessage(content, message.id)
      setContent(content)
      setIsEditing(false)
    } catch (err: any) {
      // The error will be because the message content is empty, so I don't want to close the edit box
    }
  }

  return (
    <MessageWrapper onMouseEnter={()=>setHovering(true)} onMouseLeave={()=>setHovering(false)}>
      <AuthorProfilePicture cldImg={cloud.image(message.author.image)} />
      <MessageContent>
        <MessageDetails>
          <h3>{message.author.username}</h3>
          <p>{formatDate(message.timestamp)}</p>
          { edited && <p>Edited: {formatDate(message.edit_timestamp)}</p> }
        </MessageDetails>
        {isEditing ? <EditMessage onEdit={editHandler} onCancel={() => setIsEditing(false)} {...{message}} ref={editRef}/> : <p>{content}</p>}
        {message.author.id === user?.id && !isEditing && // Only show actions if the user is the author
          <MessageActions $hovering={hovering}>
            <MessageAction onClick={() => setIsEditing(true)} icon={faPen} />
            <MessageAction onClick={() => deleteMessage(message.id)} icon={faMinus} />
          </MessageActions>
        }
      </MessageContent>
    </MessageWrapper>
  )
}

const MessageWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 10px;
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

const MessageContent = styled.div`
  width: 100%;
`

const AuthorProfilePicture = styled(AdvancedImage)`
  height: 50px;
  width: 50px;
  object-fit: cover;
  border-radius: 50%;
`

export default Message
