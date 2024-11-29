import MessageBar from "./Messages/MessageBar"
import Messages from "./Messages/Messages"

const Channel = (props: { messages: any[] }) => {
  return (
    <div style={{ backgroundColor: "red", width: "100vw", height: "500px" }}>
      <Messages messages={props.messages}/>
      <MessageBar />
    </div>
  )
}

export default Channel