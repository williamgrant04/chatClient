import { createContext, useState } from "react";
import { User } from "../utils/APITypes";

const userContext = createContext({
  user: {} as User | undefined,
  setUser: (_user: User | undefined): void => {},
})

export const UserContextProvider = ({ children }: { children: React.JSX.Element }) => {
  const [user, setUser] = useState<User | undefined>()

  return (
    <userContext.Provider value={{
      user,
      setUser,
    }}>
      { children }
    </userContext.Provider>
  )
}

export default userContext
