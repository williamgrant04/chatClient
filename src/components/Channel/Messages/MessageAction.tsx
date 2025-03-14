import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

interface MessageActionProps {
  onClick: (e: React.MouseEvent) => void,
  icon: IconDefinition
}

const MessageAction = ({ onClick, icon, ...props }: MessageActionProps) => {
  return (
    <Action onClick={onClick} {...props}>
      <FontAwesomeIcon icon={icon} />
    </Action>
  )
}

const Action = styled.button`
  box-sizing: border-box;
  height: 100%;
  background-color: black;
  border: none;
  cursor: pointer;
  color: #f0f0f0;
  transition: 0.3s;
  padding: 5px 10px;

  &:first-child {
    border-radius: 10px 0 0 10px;
  }

  &:last-child {
    border-radius: 0 10px 10px 0;
  }

  &:hover {
    background-color: #909090;
    color: black;
  }
`

export default MessageAction;
