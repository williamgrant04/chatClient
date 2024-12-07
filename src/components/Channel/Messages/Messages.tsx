import { useParams } from "@tanstack/react-router";
import { createConsumer } from "@rails/actioncable";
import { useEffect, useRef, useState, useLayoutEffect } from "react";
import styled from "styled-components";
import Message from "./Message";

const cable = createConsumer("ws://localhost:3000/cable")

const Messages = (props: { messages: Message[] }) => {
  const [messages, setMessages] = useState(props.messages)
  const scrollRef = useRef<HTMLDivElement>(null)
  const params = useParams({ from: "/_auth/server/$serverId/$channelId" })

  const handleReceived = (data: { edit: boolean, message: Message }) => {
    if (!data.edit) {
      setMessages([...messages, data.message])
    }
  }

  cable.subscriptions.create({ channel: "ChannelChannel", id: params.channelId }, { received: handleReceived })

  useLayoutEffect(() => { // When page first loads, scroll to bottom instantly
    scrollRef.current?.scrollIntoView({behavior: "instant"})
  }, [])

  useEffect(() => {
    setMessages(props.messages)

    return () => {
      cable.disconnect()
    }
  }, [params])

  useEffect(() => { // When new message is added, scroll smoothly
    scrollRef.current?.scrollIntoView({behavior: "smooth"})
  }, [messages])

  return (
    <MessagesWrapper>
      {messages.map((message) => {
        return (
          <Message key={message.id} message={message} />
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
