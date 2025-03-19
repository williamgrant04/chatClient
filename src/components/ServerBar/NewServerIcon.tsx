import { useRef } from "react"
import styled from "styled-components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlus } from "@fortawesome/free-solid-svg-icons/faPlus"
import NewServerModal from "./NewServerModal"

const NewServerIcon = () => {
  const modalRef = useRef<{ open: () => void }>(null)

  const handleModalClick = () => {
    modalRef.current!.open()
  }

  return (
    <>
      <Wrapper onClick={handleModalClick}>
        <Icon aria-hidden="false" width="50" height="50" viewBox="0 0 50 50">
          <FontAwesomeIcon icon={faPlus} />
        </Icon>
      </Wrapper>
      <NewServerModal ref={modalRef}/>
    </>
  )
}

const Wrapper = styled.div`
  height: 50px;
  width: 50px;
  background-color: #ddd;
  border-radius: 50%;
  cursor: pointer;
  transition: 0.2s;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    transform: scale(1.06); // Subtle effect, 1.1 would be too much
    border-radius: 5px;
  }
`

const Icon = styled.svg`
  height: 35px;
  width: 35px;

  svg {
    height: 30px;
    width: 30px;
  }
`

export default NewServerIcon
