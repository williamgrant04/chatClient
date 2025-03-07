import { useContext, useReducer, useState } from "react"
import { signup } from "../../utils/ChatAPI"
import { useNavigate } from "@tanstack/react-router"
import userContext from "../../context/UserContext"
import styled from "styled-components"
import Input from "./Input"

interface error {
  type: string,
  message: string
}

const emailRegex = /[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)/

const SignupForm = ({ setLogin, loginState }: { setLogin: React.Dispatch<React.SetStateAction<boolean>>, loginState: boolean }) => {
  const user = useContext(userContext)
  const [error, setError] = useState<error | null>(null) // Null = no error
  const navigate = useNavigate()

  const validateCredentials = (credentials: { username: string, email: string, password: string }) => {
    if (!credentials.email) {
      setError({ type: "email", message: "Please provide an email." })
      return false
    }

    if (!emailRegex.test(credentials.email)) {
      setError({ type: "email", message: "Email is invalid." })
      return false
    }

    if (!credentials.username) {
      setError({ type: "username", message: "Please provide a username." })
      return false
    }

    if (!credentials.password) {
      setError({ type: "password", message: "Please provide a password." })
      return false
    }

    if (credentials.password.length < 6 || credentials.password.length > 128) {
      setError({ type: "password", message: "Please provide a password between 6 and 128 characters long." })
      return false
    }

    return true
  }

  const [credentials, dispatchCredentials] = useReducer((state: { email: string, username: string, password: string }, action: { type: string, value: string }) => {
    switch (action.type) {
      case 'username':
        return { ...state, username: action.value }
      case 'email':
        return { ...state, email: action.value }
      case 'password':
        return { ...state, password: action.value }
      default:
        throw new Error("An error has occurred")
    }
  }, { username: "", email: "", password: "" })

  const formChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    setError(null)
    dispatchCredentials({type: e.target.name, value: e.target.value})
  }

  const formSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)

    if (validateCredentials(credentials)) {
      try {
        const res = await signup(credentials) as User
        user.setUser(res)

        sessionStorage.setItem("loginsignup", "true") // Temporary sessionStorage to prevent the user from going back to the login page
        navigate({ to: "/server/self" })
      } catch (err: any) {
        if (err.error.type) {
          setError(err.error)
        } else {
          setError({ type: "unknown", message: "An unknown error has occurred, try again later." })
        }
      }
    }
  }

  return (
    <SignupWrapper>
      <h2>Join the party</h2>
      <Form onSubmit={formSubmitHandler} autoComplete="off">
        <Input name="email" error={error} onChange={formChangeHandler} value={credentials.email} />

        <Input name="username" error={error} onChange={formChangeHandler} value={credentials.username} />

        <Input name="password" error={error} onChange={formChangeHandler} value={credentials.password} />

        <Submit type="submit" value="Sign up" />
        { (error && error.type === "unknown") && <ErrorText>{error.message}</ErrorText> }

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

const ErrorText = styled.p`
  margin: 0;
  font-style: italic;
  font-size: 16px;
`

export default SignupForm
