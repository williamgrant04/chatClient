import { useState } from "react"
import LoginForm from "./LoginForm"
import Signup from "./SignupForm"
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
        {
          login ?
          <FormWrapper>
            <LoginForm setLogin={setLogin} loginState={login}/>
          </FormWrapper> :
          <FormWrapper>
            <Signup setLogin={setLogin} loginState={login}/>
          </FormWrapper>
        }
      </ContentWrapper>
    </IndexWrapper>
  )
}

const IndexWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px 40px;
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
    font-size: 1.2rem;
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

  p {
    margin: 0;
    font-size: 1.2rem;
  }
`

export default Index
