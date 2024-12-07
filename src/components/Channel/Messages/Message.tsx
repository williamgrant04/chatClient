import styled from "styled-components"

const Message = ({ message }: { message: Message }) => {
  return (
    <MessageWrapper>
      <MessageDetails>
        <h3>{message.author.username}</h3>
        <p>{message.created_at}</p>
      </MessageDetails>
      <p>{message.content}</p>
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
