import { useState } from "react"
import LoginForm from "./LoginForm"
import SignupForm from "./SignupForm"
import styled from "styled-components"

const Index = () => {
  const [login, setLogin] = useState(false)

  return (
    <IndexWrapper>
      <h1>Welcome to chatapp</h1>
      <ContentWrapper>
        <Description>
          <p>Description goes here</p>
        </Description>
        <FormWrapper>
          { login ? (
            <LoginForm />
          ) : (
            <SignupForm />
          )}
          <LoginSignupButton onClick={() => { setLogin(prev => !prev) }}>{ login ? "Not a member?" : "Already have an account?"}</LoginSignupButton>
        </FormWrapper>
      </ContentWrapper>
    </IndexWrapper>
  )
}

const IndexWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px 40px;

  h1 {
    font-size: 2.5rem;
    margin-bottom: 5px;
  }
`

const ContentWrapper = styled.div`
  background-color: #a0a0a0;
  margin-top: 20px;
  display: flex;
  gap: 25px;
  height: 80vh;
  border-radius: 10px;
`

const Description = styled.div`
  border-radius: 10px;
  background-color: #e0e0e0;
  width: 100%;
  margin: 35px;
  margin-right: 0;
  padding: 20px;

  p {
    margin: 0;
    font-size: 1.6rem;
  }
`

const FormWrapper = styled.div`
  border-radius: 10px;
  background-color: #e0e0e0;
  width: 80%;
  margin: 35px;
  margin-left: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
`

const LoginSignupButton = styled.button`
  margin: 10px;
  font-size: 16px;
  padding: 5px 10px;
  border-radius: 10px;
  transition: 0.3s;
  background-color: #fff;
  color: #000;
  border: 1px solid #000;
  cursor: pointer;

  &:hover {
    border: 1px solid transparent;
    background-color: #000;
    color: #fff;
    border-radius: 5px;
  }

  &:active {
    border: 1px solid transparent;
    background-color: #444;
    color: #fff;
    border-radius: 5px;
  }
`

export default Index
