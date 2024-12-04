import { useContext, useState } from "react"
import userContext from "../../context/UserContext"
import UserDropDown from "./UserDropdown"

const UserDetails = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const user = useContext(userContext)

  return (
    <div style={{ justifySelf: "end" }}>
      <h1 style={{ margin: 0 }} onClick={() => { setDropdownOpen(!dropdownOpen) }}>{user.user?.username}</h1>
      { dropdownOpen && <UserDropDown /> }
    </div>
  )
}

export default UserDetails
