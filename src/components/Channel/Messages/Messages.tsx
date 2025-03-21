import { useParams } from "@tanstack/react-router";
import { createConsumer } from "@rails/actioncable";
import { useEffect, useRef, useState, useLayoutEffect } from "react";
import styled from "styled-components";
import Message from "./Message";

const cable = createConsumer("ws://localhost:3000/cable")

const sortMessages = (a: Message, b: Message) => {
  if (a.timestamp > b.timestamp) {
    return -1
  } else if (a.timestamp < b.timestamp) {
    return 1
  } else {
    return 0
  }
}

// TODO: Add scroll observer to fetch more messages if scrolled to the top
const Messages = (props: { messages: Message[] }) => {
  const [messages, setMessages] = useState<Message[]>([])
  const scrollRef = useRef<HTMLDivElement>(null)
  const params = useParams({ from: "/_auth/server/$serverId/$channelId" })

  const handleReceived = (data: { edit?: boolean, message: Message, destroy?: boolean }) => {
    console.log(data);

    if (!data.edit && !data.destroy) {
      setMessages(prevMessages => {
        const newArr = [...prevMessages]
        newArr.unshift(data.message)
        return newArr
      })
    } else if (data.edit && !data.destroy) {
      setMessages(prevMessages => {
        const messages = [ ...prevMessages ]
        const message = {...messages.find((message) => message.id === data.message.id)} as Message
        message.content = data.message.content
        const newMessages = [ ...messages.filter((message) => message.id !== data.message.id), message ].sort(sortMessages)
        return newMessages
      })
    } else if (data.destroy) {
      setMessages(prevMessages => prevMessages.filter((message) => message.id !== data.message.id))
    }
  }

  useEffect(() => {
    return () => cable.disconnect()
  }, [])

  useLayoutEffect(() => { // When page first loads, scroll to bottom instantly
    scrollRef.current?.scrollIntoView({behavior: "instant"})
  }, [])

  useEffect(() => { // When new message is added, scroll smoothly
    // TODO: Make this only scroll if user is at the bottom of the messages scroll
    scrollRef.current?.scrollIntoView({behavior: "smooth"})
  }, [messages])

  useEffect(() => {
    setMessages(props.messages)
    cable.subscriptions.create({ channel: "MessageChannel", id: params.channelId }, { received: handleReceived })

    return () => {
      cable.disconnect()
    }
  }, [params])

  return (
    <MessagesWrapper>
      <div ref={scrollRef}></div>
      {messages.map((message) => {
        return (
          <Message key={message.id} message={message} />
        )
      })}
    </MessagesWrapper>
  )
}

const MessagesWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column-reverse;
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
