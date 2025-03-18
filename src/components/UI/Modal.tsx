import { faXmarkCircle } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { forwardRef, useImperativeHandle, useState } from "react";
import ReactModal from "react-modal";
import styled from "styled-components";

interface Ref {
  open(): void
  close(): void
  toggle(): void
}

interface ModalProps {
  open?: boolean,
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>,
  height?: string,
  width?: string,
  onBeforeClose?: () => void
}

// ? Should I keep the ref, it's a reasonable performance hit with enough of them.
const Modal = forwardRef<Ref, React.PropsWithChildren<ModalProps>>(({ children, ...props }, ref) => {
  ReactModal.setAppElement("#root")
  const [open, setOpen] = useState(false)

  useImperativeHandle(ref, () => {
    return {
      open() {
        setOpen(true)
      },

      close() {
        setOpen(false)
      },

      toggle() {
        setOpen(prevOpen => !prevOpen) // Not sure how often I'd use this, but flexability
      }
    }
  })

  const closeHandler = () => {
    if (props.onBeforeClose) props.onBeforeClose()
    if (props.setOpen) {
      props.setOpen(false)
    } else {
      setOpen(false)
    }
  }

  return (
    <ModalWrapper isOpen={props.open || open} onRequestClose={closeHandler} style={{ overlay: { backgroundColor: "rgb(0, 0, 0, 0.5)", zIndex: 3 } }} $height={props.height} $width={props.width}>
      <CloseButton onClick={closeHandler}>
        <FontAwesomeIcon icon={faXmarkCircle} />
      </CloseButton>
      { children }
    </ModalWrapper>
  )
})

const ModalWrapper = styled(ReactModal)<{ $height?: string, $width?: string }>`
  outline: 0;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  border-radius: 10px;
  padding: 20px;
  height: ${({ $height }) => $height ? $height : "40%"};
  width: ${({ $width }) => $width ? $width : "40%"};
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 3;
`

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  aspect-ratio: 1/1;
  height: 10%;
  background-color: transparent;
  border: none;
  cursor: pointer;
  color: #000;
  transition: 0.3s;
  padding: 0;
  border-radius: 50%;

  svg {
    aspect-ratio: 1/1;
    height: 100%;
  }

  &:hover {
    transform: scale(1.1);
    background-color: #f0f0f0;
    color: #909090;
  }
`

export default Modal;
