import styled from "styled-components"

interface InputProps {
  errors: UserError[],
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
  value: string,
  name: string
}

const Input = ({ errors, onChange, value, name }: InputProps) => {
  const placeholder = name.charAt(0).toUpperCase() + name.slice(1)

  const errorText = errors.filter((err) => err.type === name)

  return (
    <>
      <TextInput type={name === "password" ? "password" : "text"} placeholder={placeholder} name={name} onChange={onChange} value={value} />
      {/* Only want to display one error at a time, so even if there's multiple just display one. */}
      { errorText && <ErrorText>{errorText[0]?.message}</ErrorText> }
    </>
  )
}

const TextInput = styled.input`
  padding: 5px 10px;
  font-size: 1.4rem;
  border-radius: 10px;
  border: 1px solid transparent;
  outline: none;
  transition: 0.3s;

  &:focus {
    border: 1px solid #000;
    border-radius: 5px;
  }
`

const ErrorText = styled.p`
  margin: 0;
  font-style: italic;
  font-size: 16px;
`

export default Input
