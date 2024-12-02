import React, { useContext, useReducer, useState } from "react"
import { login } from "../../utils/ChatAPI"
import { useNavigate } from "@tanstack/react-router"
import userContext from "../../context/UserContext"
import { User } from "../../utils/APITypes"

const LoginForm = () => {
  const user = useContext(userContext)
  const navigate = useNavigate()
  const [errors, setErrors] = useState<string[]>([])

  const [credientials, dispatchCredentials] = useReducer((state: { email: string, password: string }, action: { type: string, value: string }) => {
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
    dispatchCredentials({type: e.target.name, value: e.target.value})
  }

  const formSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setErrors([])
    try {
      const res = await login(credientials) as User // Won't be undefined because the API will throw an error if there's an error
      user.setUser(res)
      sessionStorage.setItem("loginsignup", "true")
      navigate({ to: "/server/self" })
    } catch (err: any) {
      console.log(err)
      setErrors(err)
    }
  }

  return (
    <div>
     <h2>Welcome back</h2>
      <form onSubmit={formSubmitHandler}>
        <input type="text" placeholder="Email" name="email" onChange={formChangeHandler} value={credientials.email} />
        <input type="password" placeholder="Password" name="password" onChange={formChangeHandler} value={credientials.password} />
        <input type="submit" value="Log in" />
      </form>
      <p>{errors}</p>
    </div>
  )
}

export default LoginForm
