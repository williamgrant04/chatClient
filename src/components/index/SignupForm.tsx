import React, { useContext, useReducer, useState } from "react"
import { signup } from "../../utils/ChatAPI"
import { useNavigate } from "@tanstack/react-router"
import userContext from "../../context/UserContext"
import { User } from "../../utils/APITypes"

const SignupForm = () => {
  const user = useContext(userContext)
  const [errors, setErrors] = useState<string[]>([])
  const navigate = useNavigate()

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
      sessionStorage.setItem("loginsignup", "true") // Temporary solution to prevent the user from going back to the login page
      navigate({ to: "/server/self" })
    } catch (err: any) {
      setErrors(err.errors)
    }
  }

  return (
    <div>
      <h2>Join the party</h2>
      <form onSubmit={formSubmitHandler}>
        <input type="text" placeholder="Email" name="email" onChange={formChangeHandler} value={credientials.email} />
        <input type="text" placeholder="Username" name="username" onChange={formChangeHandler} value={credientials.username} />
        <input type="password" placeholder="Password" name="password" onChange={formChangeHandler} value={credientials.password} />
        <input type="submit" value="Sign up" />
      </form>
      <p>{errors}</p>
    </div>
  )
}

export default SignupForm
