import styled from "styled-components"
import { deleteMessage, editMessage } from "../../../utils/ChatAPI"
import { useContext, useEffect, useRef, useState } from "react"
import userContext from "../../../context/UserContext"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPen } from "@fortawesome/free-solid-svg-icons/faPen"
import { faMinus } from "@fortawesome/free-solid-svg-icons/faMinus"
import { AdvancedImage } from "@cloudinary/react"
import cloudinaryContext from "../../../context/CloudinaryContext"
import EditMessage from "./EditMessage"

const Message = ({ message }: { message: Message }) => {
  const { user } = useContext(userContext)
  const { cloud } = useContext(cloudinaryContext)
  const [isEditing, setIsEditing] = useState(false)
  const [content, setContent] = useState(message.content)
  const [hovering, setHovering] = useState(false)
  const editRef = useRef<HTMLDivElement>(null)
  const date = new Date(message.created_at)

  useEffect(() => {
    editRef.current?.scrollIntoView({ behavior: "smooth" })

    if (isEditing) document.addEventListener("keydown", function cancel(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setIsEditing(false)
        document.removeEventListener("keydown", cancel)
      }
    })
  }, [isEditing])

  const editHandler = async (content: string) => {
    try {
      await editMessage(content, message.id)
    } catch (err: any) {
      // The error will be because the message content is empty, so I don't want to close the edit box
    }
  }

  const editSuccessHandler = (content: string) => {
    setContent(content)
    setIsEditing(false)
  }

  return (
    <MessageWrapper onMouseEnter={()=>setHovering(true)} onMouseLeave={()=>setHovering(false)}>
      <AuthorProfilePicture cldImg={cloud.image(message.author.image)} />
      <div>
        <MessageDetails>
          <h3>{message.author.username}</h3>
          <p>{date.toDateString()}</p>
        </MessageDetails>
        {isEditing ? <EditMessage onEdit={editHandler} onEditSuccess={editSuccessHandler} onCancel={() => setIsEditing(false)} {...{message}} ref={editRef}/> : <p>{content}</p>}
        {message.author.id === user?.id && !isEditing && // Only show the edit button if the user is the author of the message
          <MessageActions $hovering={hovering}>
            <Action onClick={() => setIsEditing(true)}>
              <FontAwesomeIcon icon={faPen} />
            </Action>
            {/* This will be a delete button */}
            <Action onClick={() => deleteMessage(message.id)}>
              <FontAwesomeIcon icon={faMinus} />
            </Action>
          </MessageActions>
        }
      </div>
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

const AuthorProfilePicture = styled(AdvancedImage)`
  height: 50px;
  width: 50px;
  object-fit: cover;
  border-radius: 50%;
`

export default Message
