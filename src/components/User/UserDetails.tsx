import { useContext } from "react"
import userContext from "../../context/UserContext"

const UserDetails = () => {
  const user = useContext(userContext)

  return (
    <div>
      <h1>{user.user?.username}</h1>
    </div>
  )
}

export default UserDetails
