import React, { useReducer } from "react"

const LoginForm = () => {
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

  const formSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
  }

  return (
    <div>
     <h2>Welcome back</h2>
      <form onSubmit={formSubmitHandler}>
        <input type="text" placeholder="Email" name="email" onChange={formChangeHandler} value={credientials.email} />
        <input type="password" placeholder="Password" name="password" onChange={formChangeHandler} value={credientials.password} />
        <input type="submit" value="Log in" />
      </form>
    </div>
  )
}

export default LoginForm
