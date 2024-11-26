import axios from "axios"

interface User {
  id: number,
  email: string,
  username: string,
  created_at: string,
  updated_at: string,
  jti: string
}

interface signupReponse {
  user?: User,
  errors?: string[]
}

export const signup = (credentials: { email: string, username: string, password: string }) => {
  return new Promise<signupReponse>(async (resolve, reject) => {
    try {
      const response = await axios.post("http://localhost:3000/signup", {
        user: {
          ...credentials
        }
      })

      console.log(response)
      localStorage.setItem("token", response.headers.authorization.split(" ")[1])
      resolve(response.data)
    } catch (error: any) {
      reject(error.response.data)
    }
  })
}

export const login = (credentials: { email: string, password: string }) => {
  return new Promise<signupReponse>(async (resolve, reject) => {
    try {
      const response = await axios.post("http://localhost:3000/login", {
        user: {
          ...credentials
        }
      })

      console.log(response)
      localStorage.setItem("token", response.headers.authorization.split(" ")[1])
      resolve(response.data)
    } catch (error: any) {
      reject(error.response.data)
    }
  })
}

export const logout = async () => {
  return new Promise(async (resolve, reject) => {
    const response = await axios.delete("http://localhost:3000/logout", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })

    // todo: handle response
  })
}

export const loggedin = () => {
  return new Promise<{ logged_in: boolean, user?: User }>(async (resolve, reject) => {
    try {
      const response = await axios.get("http://localhost:3000/loggedin", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      })

      console.log(response)
      resolve(response.data)
    } catch (error: any) {
      reject(error.response.data)
    }
  })
}
