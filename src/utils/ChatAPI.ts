import axios from "axios"
const baseUrl = "http://localhost:3000"
import { IChannel, Message, Server, User } from "./APITypes"


//* USER AUTH
export const signup = (credentials: { email: string, username: string, password: string }) => {
  return new Promise<User | string[]>(async (resolve, reject) => {
    try {
      const response = await axios.post(`${baseUrl}/signup`, {
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
  return new Promise<User | string[]>(async (resolve, reject) => {
    try {
      const response = await axios.post(`${baseUrl}/login`, {
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

export const logout = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.delete(`${baseUrl}/logout`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      })

      console.log(response)
      localStorage.removeItem("token")
      resolve(response.data)
    } catch (error: any) {
      reject(error.response.data)
    }
  })
}

export const loggedin = () => {
  return new Promise<{ logged_in: boolean, user?: User }>(async (resolve, reject) => {
    try {
      const response = await axios.get(`${baseUrl}/loggedin`, {
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

//* SERVERS
export const getServers = () => {
  return new Promise<Server[]>(async (resolve, reject) => {
    try {
      const response = await axios.get(`${baseUrl}/servers`, {
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

export const getServer = (id: string) => {
  return new Promise<Server>(async (resolve, reject) => {
    try {
      const response = await axios.get(`${baseUrl}/server/${id}`, {
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

export const newServer = (name: string) => {
  return new Promise<Server>(async (resolve, reject) => {
    try {
      const response = await axios.post(`${baseUrl}/servers/new`, {
        server: {
          name
        }
      }, {
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

//* CHANNELS
export const getChannels = (serverId: string) => {
  return new Promise<IChannel[]>(async (resolve, reject) => {
    try {
      const response = await axios.get(`${baseUrl}/server/${serverId}/channels`, {
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

export const getChannel = (id: string) => {
  return new Promise<IChannel>(async (resolve, reject) => {
    try {
      const response = await axios.get(`${baseUrl}/channel/${id}`, {
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

//* MESSAGES
export const getMessages = (channelId: string) => {
  return new Promise<Message[]>(async (resolve, reject) => {
    try {
      const response = await axios.get(`${baseUrl}/channel/${channelId}/messages`, {
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

// This returns a boolean, because the message object comes from the subscription and not the API
export const sendMessage = (content: string, channelId: string) => {
  return new Promise<boolean>(async (resolve, reject) => {
    try {
      const response = await axios.post(`${baseUrl}/channel/${channelId}/messages/new`, {
        message: {
          content
        }
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      })

      console.log(response)
      resolve(true)
    } catch (error: any) {
      reject(false)
    }
  })
}
