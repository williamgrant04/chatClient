import React, { useContext, useReducer, useState } from "react"
import { login } from "../../utils/ChatAPI"
import { useNavigate } from "@tanstack/react-router"
import userContext from "../../context/UserContext"
import styled from "styled-components"
import Input from "./Input"

const LoginForm = () => {
  const user = useContext(userContext)
  const navigate = useNavigate()
  const [errors, setErrors] = useState<UserError[]>([])

  const credentialsValid = (credentials: { email: string, password: string }) => {
    let valid = true

    if (!credentials.email) {
      valid = false
      setErrors(prevErrors => [ ...prevErrors, { type: "email", message: "Please provide an email" } ])
    }

    if (!credentials.password) {
      valid = false
      setErrors(prevErrors => [ ...prevErrors, { type: "password", message: "Please provide a password" } ])
    }

    return valid
  }

  const [credentials, dispatchCredentials] = useReducer((state: { email: string, password: string }, action: { type: string, value: string }) => {
    switch (action.type) {
      case 'email':
        return { email: action.value, password: state.password }
      case 'password':
        return { email: state.email, password: action.value }
      default:
        throw new Error("An error has occurred")
    }
  }, { email: "", password: "" })

  const formChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    setErrors([])
    dispatchCredentials({type: e.target.name, value: e.target.value})
  }

  const formSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setErrors([])

    if (credentialsValid(credentials)) {
      try {
        const res = await login(credentials) as User
        user.setUser(res)

        sessionStorage.setItem("loginsignup", "true") // Temporary sessionStorage to prevent the user from going back to the login page
        navigate({ to: "/server/self" })
      } catch (err: any) {
        setErrors(prevErrors => [ ...prevErrors, { type: "unknown", message: err } ])
      }
    }
  }

  return (
    <LoginWrapper>
     <h2>Welcome back</h2>
      <Form onSubmit={formSubmitHandler}>
        <Input name="email" errors={errors} onChange={formChangeHandler} value={credentials.email} />
        <Input name="password" errors={errors} onChange={formChangeHandler} value={credentials.password} />
        <Submit type="submit" value="Log in" />
        {(errors && errors.map((err) => {
          if (err.type !== "unknown") return null
          return (
            <ErrorText>{err.message}</ErrorText>
          )
        }))}
      </Form>
    </LoginWrapper>
  )
}

const LoginWrapper = styled.div`
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

export default LoginForm
