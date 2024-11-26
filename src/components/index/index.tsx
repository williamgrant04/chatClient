import { useState } from "react"
import LoginForm from "./LoginForm"
import Signup from "./SignupForm"


const Index = () => {
  const [login, setLogin] = useState(false)
  // Not final, just basic layout for now, although layout will change
  return (
    <div>
      <h1>Welcome to chatapp</h1>
      <div>
        <div>
          <p>Description goes here</p>
        </div>
        {
          login ?
          <div>
            <LoginForm />
            <p>Not a member? <span onClick={() => { setLogin(!login) }}>Sign up</span></p>
          </div> :
          <div>
            <Signup />
            <p>Already have an account? <span onClick={() => { setLogin(!login) }}>Log in</span></p>
          </div>
        }
      </div>
    </div>
  )
}

export default Index
