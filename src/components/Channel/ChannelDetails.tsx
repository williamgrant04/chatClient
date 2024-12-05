import styled from "styled-components"

const ChannelDetails = ({ channel }: { channel: Channel }) => {
  return (
    <Details>
      {/* Once I implement pins and search I'll update this further */}
      <p>{channel.name}</p>
    </Details>
  )
}

const Details = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  height: 30px;
  padding: 10px 20px;
  font-size: 1.6rem;
  background-color: #606060;

  &::after {
    content: "";
    width: 100%;
    position: absolute;
    bottom: -6px;
    height: 6px;
    box-shadow: 0 6px 6px -6px inset;
    right: 0;
  }

  p {
    margin: 0;
    font-size: 1.6rem
  }
`

export default ChannelDetails
