import styled from "styled-components";

interface ToggleSwitchProps {
  onToggle?: (state: boolean) => void,
  toggled?: boolean,
  [key: string]: any
}

const ToggleSwitch = ({ onToggle, toggled, ...props }: ToggleSwitchProps) => {
  if (props.children) throw new Error("ToggleSwitch component cannot have child elements.")

  return (
    <Switch type="checkbox" onChange={(e) => {onToggle && onToggle(e.target.checked)}} checked={toggled} {...props}/>
  )
}

const Switch = styled.input`
  -webkit-appearance: none;
  appearance: none;
  position: relative;
  width: 50px;
  height: 30px;
  border-radius: 25px;
  background-color: red;
  transition: 0.3s;
  outline: none;
  cursor: pointer;

  &::after {
    content: "";
    position: absolute;
    top: 50%;
    left: 30%;
    transform: translate(-50%, -50%);
    transition: 0.3s;
    width: 1.25rem;
    height: 1.25rem;
    border-radius: 50%;
    background-color: white;
  }

  &:checked {
    background-color: blue;

    &::after {
      left: 70%;
    }
  }
`

export default ToggleSwitch;
