import { useContext, useReducer, useState } from "react";
import userContext from "../../context/UserContext";
import { useNavigate } from "@tanstack/react-router";
import { login, signup } from "../../utils/ChatAPI";
import styled from "styled-components";
import Input from "./Input";

const emailRegex = /[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)/

const Form = ({ loginForm }: { loginForm: boolean }) => {
  const { setUser } = useContext(userContext)
  const [errors, setErrors] = useState<UserError[]>([])
  const navigate = useNavigate()

  const credentialsValid = (credentials: { username?: string, email: string, password: string }) => {
    let hasError = false

    if (!credentials.email) {
      hasError = true
      setErrors(prevErrors => [ ...prevErrors, { type: "email", message: "Please provide an email" } ])
    }

    if (!emailRegex.test(credentials.email)) {
      hasError = true
      setErrors(prevErrors => [ ...prevErrors, { type: "email", message: "Email is invalid" } ])
    }

    if (!credentials.username && !loginForm) { // Ensures it only checks for a username if user is on login
      hasError = true
      setErrors(prevErrors => [ ...prevErrors, { type: "username", message: "Please provide a username" } ])
    }

    if (!credentials.password) {
      hasError = true
      setErrors(prevErrors => [ ...prevErrors, { type: "password", message: "Please provide a password" } ])
    }

    if (credentials.password.length < 6) {
      hasError = true
      setErrors(prevErrors => [ ...prevErrors, { type: "password", message: "Password too short" } ])
    }

    if (credentials.password.length > 128) {
      hasError = true
      setErrors(prevErrors => [ ...prevErrors, { type: "password", message: "Password too long" } ])
    }

    return hasError
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
    setErrors([])
    dispatchCredentials({type: e.target.name, value: e.target.value})
  }

  const formSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setErrors([])

    if (!credentialsValid(credentials)) {
      try {
        if (loginForm) {
          const { email, password } = credentials
          const res = await login({ email, password }) as User
          setUser(res)
        } else {
          const res = await signup(credentials) as User
          setUser(res)
        }

        sessionStorage.setItem("loginsignup", "true") // Temporary sessionStorage to prevent the user from going back to the login page
        navigate({ to: "/server/self" })
      } catch (errs: any) {
        if (errs[0]?.type) {
          setErrors(prevErrors => [ ...prevErrors, ...errs ])
        } else {
          if (typeof(errs) === "string") {
            setErrors(prevErrors => [ ...prevErrors, { type: "unknown", message: errs } ])
          } else {
            setErrors(prevErrors => [ ...prevErrors, { type: "unknown", message: "An unknown error has occurred, try again later." } ])
          }
        }
      }
    }
  }

  return (
    <FormWrapper>
      <h2>{ loginForm ? "Welcome back" : "Join the party" }</h2>
      <form onSubmit={formSubmitHandler}>
        <Input name="email" errors={errors} onChange={formChangeHandler} value={credentials.email} />
        { !loginForm && <Input name="username" errors={errors} onChange={formChangeHandler} value={credentials.username} />}
        <Input name="password" errors={errors} onChange={formChangeHandler} value={credentials.password} />

        <Submit type="submit" value={ loginForm ? "Log in" : "Sign up" } />
        {(errors && errors.map((err) => {
          if (err.type !== "unknown") return null
          return (
            <ErrorText>{err.message}</ErrorText>
          )
        }))}
      </form>
    </FormWrapper>
  )
}

const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  width: 60%;

  h2 {
    font-size: 2rem;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 100%;

    p {
      align-self: center;
    }
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

export default Form;
