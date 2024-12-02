import { useParams } from "@tanstack/react-router";
import { sendMessage } from "../../../utils/ChatAPI";
import React, { useState } from "react";

const MessageBar = () => {
  const params = useParams({ from: "/_auth/server/$serverId/$channelId" })

  const [message, setMessage] = useState("")

  const messageSubmitHandler = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault()
    sendMessage(message, params.channelId)
    setMessage("")
  }

  return (
    <div>
      <form onSubmit={messageSubmitHandler}>
        <input type="text" value={message} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setMessage(e.target.value)} />
        <input type="submit" value="Send" />
      </form>
    </div>
  )
}

export default MessageBar
