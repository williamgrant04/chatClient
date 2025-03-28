import { inviteUser, newServer } from "../../utils/ChatAPI"
import styled from "styled-components"
import { forwardRef, useImperativeHandle, useState } from "react"
import Loader from "../UI/Loader"
import Modal from "../UI/Modal"
import { encodeFile } from "../../utils/encodeFile"

const NewServerModal = forwardRef<{ open: () => void }>(
  function NewServerModal(_props, ref) {
    const [open, setOpen] = useState(false)
    const [serverName, setServerName] = useState("")
    const [image, setImage] = useState<File>()
    const [encodedImage, setEncodedImage] = useState("")
    const [error, setError] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [inviteCode, setInviteCode] = useState("")
    const [inviteLoading, setInviteLoading] = useState(false)

    useImperativeHandle(ref, () => {
      return {
        open() {
          setOpen(true)
        }
      }
    })

    const handleServerSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      setError("")

      if (serverName.trim() === "") {
        setError("Please enter a server name")
        setServerName("")
      } else if (serverName.length < 3) {
        setError("Server name too short")
      } else if (serverName.length > 50) {
        setError("Server name too long")
      } else if (!image) {
        setError("Please provide an image")
      } else {
        try {
          setIsLoading(true)
          await newServer(serverName.trim(), image)
          setOpen(false)
          setIsLoading(false)
          resetFields()
        } catch (error: any) {
          setError(error.errors[0])
        }
      }
    }

    const resetFields = () => {
      setServerName("")
      setError("")
      setEncodedImage("")
      setInviteCode("")
      setImage(undefined)
    }

    const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        setImage(e.target.files[0])
        setEncodedImage(await encodeFile(e.target.files[0]))
      } else {
        if (e.target.value.length > 50) return
        setServerName(e.target.value)
      }
    }

    const inviteSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      setInviteLoading(true)
      try {
        await inviteUser(inviteCode)
      } catch (err) {

      }
      setInviteLoading(false)
    }

    return (
      <RowModal open={open} setOpen={setOpen} onBeforeClose={resetFields}>
        <ContentWrapper>
          <Header>
            <h1>Create a new server</h1>
            <h3>Give your server a name and an icon, you can change it later, so no pressure.</h3>
          </Header>

          <Form onSubmit={handleServerSubmit}>
            <label htmlFor="server-name" hidden>Server name</label>
            <TextInput type="text" placeholder="Server name..." name="server" id="server-name" value={serverName} onChange={handleInputChange} />
            <ServerIcon>
              { encodedImage ? <IconPreview src={encodedImage} alt="Server icon" /> : "Add Icon" }
              <input type="file" name="image" onChange={handleInputChange} accept="image/jpeg, image/png" hidden/>
            </ServerIcon>
            { error && <p>{error}</p> }
            <FormButton>
              { isLoading ? (
                <Loader borderSize={4}/>
              ):(
                "Create"
              )}
            </FormButton>
          </Form>
        </ContentWrapper>

        <ContentWrapper>
          <Header>
            <h1>Or...</h1>
            <h3>Have a join code?</h3>
          </Header>
          <Form onSubmit={inviteSubmitHandler}>
            <TextInput type="text" placeholder="Join code..." value={inviteCode} onChange={(e) => setInviteCode(e.target.value)} />
            <FormButton>
              { inviteLoading ? (
                <Loader borderSize={4}/>
              ):(
                "Join"
              )}
            </FormButton>
          </Form>
        </ContentWrapper>
      </RowModal>
    )
  }
)

const RowModal = styled(Modal)`
  flex-direction: row;
`

const ContentWrapper = styled.div`
  width: 50%;
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 100%;

  p { margin: 0 }
`

const Header = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;

  h1, h3 { margin: 5px 0; }

  h3 {
    width: 75%;
    text-align: center;
  }
`

const TextInput = styled.input`
  height: 1.6rem;
  /* width: 40%; */
  font-size: 1.1rem;
  padding: 10px 20px;
  border-radius: 10px;
  border: none;
  outline: 0;
  background-color: #f0f0f0;
  transition: 0.3s;

  &:focus {
    border-radius: 5px;
    background-color: #e0e0e0;
  }
`

const ServerIcon = styled.label`
  display: flex;
  align-items: center;
  font-size: 1.1rem;
  padding: 5px 10px;
  border-radius: 10px;
  border: none;
  outline: 0;
  background-color: #f0f0f0;
  transition: 0.3s;
  cursor: pointer;

  &:hover {
    border-radius: 5px;
    background-color: #e0e0e0;
    transform: scale(1.1);
  }
`

const IconPreview = styled.img`
  height: 75px;
  width: 75px;
  object-fit: cover;
  border-radius: 50%;
`

const FormButton = styled.button`
  height: 2em;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  padding: 5px 10px;
  width: 6em;
  background-color: black;
  color: white;
  border-radius: 8px;
  cursor: pointer;
  transition: 0.3s;
  border: none;

  &:hover {
    background-color: #909090;
    color: black;
    border-radius: 5px;
    transform: scale(1.1);
  }
`

export default NewServerModal
