import { useNavigate } from "@tanstack/react-router"
import { logout } from "../../utils/ChatAPI"

const UserDropDown = () => {
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate({ to: '/' })
  }

  return (
    <div>
      <h1>User Drop Down</h1>
      <button onClick={handleLogout}>logout</button>
    </div>
  )
}

export default UserDropDown
