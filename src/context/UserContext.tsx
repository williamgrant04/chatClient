import { createContext, useState } from "react";

const userContext = createContext<{ user?: User, setUser: React.Dispatch<React.SetStateAction<User | undefined>> }>({
  user: {} as User,
  setUser: () => {},
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
