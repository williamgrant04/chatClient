import { Cloudinary } from "@cloudinary/url-gen";
import { createContext } from "react";

interface CloudinaryContext {
  cloud: Cloudinary
}

const cloud = new Cloudinary({
  cloud: {
    cloudName: "dfdpaxofx"
  }
})

const cloudinaryContext = createContext<CloudinaryContext>({ cloud })

export const CloudinaryContextProvider = ({ children }: { children: React.JSX.Element }) => {
  return (
    <cloudinaryContext.Provider value={{ cloud }}>
      { children }
    </cloudinaryContext.Provider>
  )
}

export default cloudinaryContext
