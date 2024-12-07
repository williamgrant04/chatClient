import { useParams } from "@tanstack/react-router";
import { createConsumer } from "@rails/actioncable";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

const cable = createConsumer("ws://localhost:3000/cable")

const Messages = (props: { messages: Message[] }) => {
  const [messages, setMessages] = useState(props.messages)
  const scrollRef = useRef<HTMLDivElement>(null)
  const params = useParams({ from: "/_auth/server/$serverId/$channelId" })

  cable.subscriptions.create({ channel: "ChannelChannel", id: params.channelId }, { received: (data: Message) => setMessages([...messages, data]) })

  useEffect(() => {
    setMessages(props.messages)

    return () => {
      cable.disconnect()
    }
  }, [params])

  useEffect(() => {
    scrollRef.current?.scrollIntoView({behavior: "smooth"})
  }, [messages])

  return (
    <MessagesWrapper>
      {messages.map((message) => {
        return (
          <div key={message.id}>
            <p>{message.content}</p>
          </div>
        )
      })}
      <div ref={scrollRef}></div>
    </MessagesWrapper>
  )
}

const MessagesWrapper = styled.div`
  position: relative;
  flex: 1 1 auto;
  overflow-x: hidden;
  overflow-y: scroll;
  padding: 0 20px;
  font-size: 1rem;

  // This is taken from w3schools, when I get around to updating the colours I'll update this
  /* width */
  &::-webkit-scrollbar {
    height: 10px;
    width: 10px;
  }

  /* Track */
  &::-webkit-scrollbar-track {
    margin: 5px;
    background: #c0c0c0;
    border-radius: 10px;
  }

  /* Handle */
  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background: #888;
  }

  /* Handle on hover */
  &::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`

export default Messages
