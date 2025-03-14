import { createContext, useState } from "react";

const settingsContext = createContext ({
  permanent: false,
  setPermanent: (_state: boolean) => {}
})

export const SettingsContextProvider = ({ children }: { children: JSX.Element }) => {
  const [permanent, setPermanent] = useState<boolean>(JSON.parse(localStorage.getItem("permanent")!) ?? false) // It's fine TS.

  return (
    <settingsContext.Provider value={{
      permanent,
      setPermanent
    }}>
      { children }
    </settingsContext.Provider>
  )
}

export default settingsContext
