import { useParams } from "@tanstack/react-router";
import { createConsumer } from "@rails/actioncable";
import { useEffect, useState } from "react";
import { Message } from "../../../utils/APITypes";

const cable = createConsumer("ws://localhost:3000/cable")

const Messages = (props: { messages: Message[] }) => {
  const [messages, setMessages] = useState(props.messages)
  const params = useParams({ from: "/_auth/server/$serverId/$channelId" })

  cable.subscriptions.create({ channel: "ChannelChannel", id: params.channelId }, { received: (data: Message) => setMessages([...messages, data]) })

  useEffect(() => {
    setMessages(props.messages)

    return () => {
      cable.disconnect()
    }
  }, [params])

  return (
    <div style={{ backgroundColor: "orange", width: "100vw", height: "400px" }}>
      {messages.map((message) => {
        return (
          <div key={message.id}>
            <p>{message.content}</p>
          </div>
        )
      })}
    </div>
  )
}

export default Messages
