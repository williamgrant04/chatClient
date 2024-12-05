import { useParams } from "@tanstack/react-router";
import { sendMessage } from "../../../utils/ChatAPI";
import React, { useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { IChannel } from "../../../utils/APITypes";

const MessageBar = ({ channel }: { channel: IChannel }) => {
  const params = useParams({ from: "/_auth/server/$serverId/$channelId" })
  const [message, setMessage] = useState("")

  const messageSubmitHandler = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault()
    sendMessage(message, params.channelId)
    setMessage("")
  }

  return (
    <MessageForm onSubmit={messageSubmitHandler} autoComplete="false">
      {/* The placeholder text is almost invisible, going to have to update app-wide colours,
          I know I can change the colour of it but I do think the grey is too light */}
      <MessageInput autoComplete="off" type="text" name="message" value={message} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setMessage(e.target.value)} placeholder={`Message ${channel.name}`}/>
      <SendMessage>
        <FontAwesomeIcon icon={faPaperPlane} />
      </SendMessage>
    </MessageForm>
  )
}

const MessageForm = styled.form`
  background-color: #707070;
  border-radius: 10px;
  flex-shrink: 1;
  margin: 10px 20px;
  padding-right: 10px;
  display: flex;
  gap: 10px;
`

const MessageInput = styled.input`
  background-color: #707070;
  border-radius: 10px;
  font-size: 1rem;
  padding: 10px;
  border: 0;
  outline: 0;
  width: 100%;
`

const SendMessage = styled.button`
  background-color: transparent;
  font-size: 1.5rem;
  border: 0;
  outline: 0;
  cursor: pointer;
  transition: 0.2s;

  &:hover {
    color: #ccc;
  }
`

export default MessageBar
