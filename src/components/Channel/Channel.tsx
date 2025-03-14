import styled from "styled-components"
import ChannelDetails from "./ChannelDetails"
import MessageBar from "./Messages/MessageBar"
import Messages from "./Messages/Messages"
import { useContext } from "react"
import settingsContext from "../../context/SettingsContext"

const Channel = ({ messages, channel }: { messages: Message[], channel: Channel }) => {
  const { permanent } = useContext(settingsContext)

  return (
    <ChannelWrapper $permanent={permanent}>
      <ChannelDetails channel={channel}/>
      <ChannelContent>
        <Messages messages={messages}/>
        <MessageBar channel={channel}/>
      </ChannelContent>
    </ChannelWrapper>
  )
}

const ChannelWrapper = styled.div<{ $permanent: boolean }>`
  background-color: #aaa;
  margin-left: ${props => props.$permanent ? "0" : "40px"};
  width: -webkit-fill-available;
  display: flex;
  flex-direction: column;
`

const ChannelContent = styled.div`
  background-color: #aaa;
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  min-height: 0;
  margin-right: 5px;
`

export default Channel
