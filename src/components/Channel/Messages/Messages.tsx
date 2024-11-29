import { useParams } from "@tanstack/react-router";
import { createConsumer } from "@rails/actioncable";
import { useEffect, useState } from "react";

const cable = createConsumer("ws://localhost:3000/cable")

const Messages = (props: { messages: any[] }) => {
  const [messages, setMessages] = useState(props.messages)
  const params = useParams({ from: "/_auth/server/$serverId/$channelId" })


  useEffect(() => {
    setMessages(props.messages)
    cable.subscriptions.create({ channel: "ChannelChannel", id: params.channelId }, { received: (data) => setMessages([...messages, data]) })

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
