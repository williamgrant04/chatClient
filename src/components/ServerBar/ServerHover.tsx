import styled from "styled-components"

const ServerHover = ({ server, show }: {server: Server, show: boolean}) => {

  return (
    <Hover $show={show}>
      <p>{server.name}</p>
      <i>{server.created}</i>
    </Hover>
  )
}

const Hover = styled.div<{ $show: boolean }>`
  display: ${({ $show }) => $show ? "flex" : "none"};
  color: black;
  flex-direction: column;
  align-items: center;
  position: absolute;
  left: 50%;
  top: calc(100% + 6px);
  transform: translate(-50%);
  width: max-content;
  z-index: 2;
  background-color: #d0d0d0;
  border-radius: 10px;
  padding: 10px;

  p {
    margin: 0;
    font-size: 1.2rem;
    font-weight: 600;
  }

  i {
    font-size: 0.8rem;
    color: #707070;
  }
`

export default ServerHover
