import { useContext, useReducer, useState } from "react"
import { signup } from "../../utils/ChatAPI"
import { useNavigate } from "@tanstack/react-router"
import userContext from "../../context/UserContext"
import styled from "styled-components"

const SignupForm = ({ setLogin, loginState }: { setLogin: React.Dispatch<React.SetStateAction<boolean>>, loginState: boolean }) => {
  const user = useContext(userContext)
  const [errors, setErrors] = useState<string[]>([])
  const navigate = useNavigate()

  // TODO: Add client-side validation (prevents unnecessary API calls)

  const [credientials, dispatchCredentials] = useReducer((state: { email: string, username: string, password: string }, action: { type: string, value: string }) => {
    switch (action.type) {
      case 'username':
        return {username: action.value, email: state.email, password: state.password}
      case 'email':
        return {username: state.username, email: action.value, password: state.password}
      case 'password':
        return {username: state.username, email: state.email, password: action.value}
      default:
        throw new Error("An error has occurred")
    }
  }, { username: "", email: "", password: "" })

  const formChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    dispatchCredentials({type: e.target.name, value: e.target.value})
  }

  const formSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setErrors([])
    try {
      const res = await signup(credientials) as User // Won't be undefined because the API will throw an error if there's an error
      user.setUser(res)
      sessionStorage.setItem("loginsignup", "true") // Temporary sessionStorage to prevent the user from going back to the login page
      navigate({ to: "/server/self" })
    } catch (err: any) {
      setErrors(err.errors)
    }
  }

  return (
    <SignupWrapper>
      <h2>Join the party</h2>
      <Form onSubmit={formSubmitHandler} autoComplete="off">
        <TextInput type="text" placeholder="Email" name="email" onChange={formChangeHandler} value={credientials.email} />
        <TextInput type="text" placeholder="Username" name="username" onChange={formChangeHandler} value={credientials.username} />
        <TextInput type="password" placeholder="Password" name="password" onChange={formChangeHandler} value={credientials.password} />
        <Submit type="submit" value="Sign up" />
        <p>{errors}</p>
        <p onClick={() => { setLogin(!loginState) }}>Already have an account?</p>
      </Form>
    </SignupWrapper>
  )
}

const SignupWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  width: 60%;

  h2 {
    font-size: 2rem;
  }
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;

  p {
    align-self: center;
  }
`

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

const Submit = styled.input`
  width: 100%;
  padding: 5px 10px;
  font-size: 1.4rem;
  border-radius: 10px;
  border: 1px solid transparent;
  transition: 0.3s;
  background-color: #000;
  color: #fff;
  cursor: pointer;

  &:hover {
    background-color: #fff;
    color: #000;
    border: 1px solid #000;
    border-radius: 5px;
  }


  &:active {
    background-color: #eee;
    color: #000;
    border: 1px solid #000;
    border-radius: 5px;
  }
`

export default SignupForm
