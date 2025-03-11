import axios from "axios"
const baseUrl = "http://localhost:3000"

//* USER AUTH
export const signup = async (credentials: { email: string, username: string, password: string }): Promise<User | UserError[] | string[]> => {
  try {
    const response = await axios.post(`${baseUrl}/signup`, {
      user: {
        ...credentials
      }
    })

    console.log(response)
    localStorage.setItem("token", response.headers.authorization.split(" ")[1])
    return response.data.user as User
  } catch (error: any) {
    throw error.response.data as UserError[] | string[]
  }
}

export const login = async (credentials: { email: string, password: string }): Promise<User | string> => {
  try {
    const response = await axios.post(`${baseUrl}/login`, {
      user: {
        ...credentials
      }
    })

    console.log(response)
    localStorage.setItem("token", response.headers.authorization.split(" ")[1])
    return response.data.user as User
  } catch (error: any) {
    throw error.response.data as string
  }
}

export const logout = async () => {
  try {
    const response = await axios.delete(`${baseUrl}/logout`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })

    console.log(response)
    localStorage.removeItem("token")
    return response.data
  } catch (error: any) {
    throw error.response.data
  }
}

export const loggedin = async (): Promise<{ logged_in: boolean, user?: User }> => {
  try {
    const response = await axios.get(`${baseUrl}/loggedin`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })

    console.log(response)
    return response.data
  } catch (error: any) {
    throw error.response.data
  }
}

//* SERVERS
export const getServers = async (): Promise<Server[]> => {
  try {
    const response = await axios.get(`${baseUrl}/servers`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })

    console.log(response)
    return response.data
  } catch (error: any) {
    throw error.response.data
  }
}

export const getServer = async (id: string): Promise<Server> => {
  try {
    const response = await axios.get(`${baseUrl}/server/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })

    console.log(response)
    return response.data
  } catch (error: any) {
    throw error.response.data
  }
}

export const newServer = async (name: string): Promise<Server | {errors: string[]}> => {
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
    return response.data
  } catch (error: any) {
    throw error.response.data
  }
}

//* CHANNELS
export const getChannels = async (serverId: string): Promise<Channel[]> => {
  try {
    const response = await axios.get(`${baseUrl}/server/${serverId}/channels`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })

    console.log(response)
    return response.data
  } catch (error: any) {
    throw error.response.data
  }
}

export const getChannel = async (id: string, serverId: string) => {
  try {
    const response = await axios.get(`${baseUrl}/server/${serverId}/channel/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })

    console.log(response)
    return response.data
  } catch (error: any) {
    throw error.response.data
  }
}

export const createChannel = async (name: string, serverId: number) => {
  try {
    const response = await axios.post(`${baseUrl}/server/${serverId}/channels/new`, {
      channel: {
        name
      }
    }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })

    console.log(response)
    return response.data
  } catch (error: any) {
    throw error.response.data
  }
}

//* MESSAGES
export const getMessages = async (channelId: string) => {
  try {
    const response = await axios.get(`${baseUrl}/channel/${channelId}/messages`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })

    console.log(response)
    return response.data
  } catch (error: any) {
    throw error.response.data
  }
}

// This returns a boolean, because the message object comes from the subscription and not the API
export const sendMessage = async (content: string, channelId: string) => {
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
    return true
  } catch (error: any) {
    return false
  }
}

export const editMessage = async (content: string, messageId: number) => {
  try {
    const response = await axios.patch(`${baseUrl}/message/${messageId}/edit`, {
      message: {
        content
      }
    }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })

    console.log(response)
    return true
  } catch (error: any) {
    return false
  }
}

export const deleteMessage = async (messageId: number) => {
  try {
    const response = await axios.delete(`${baseUrl}/message/${messageId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })

    console.log(response)
    return true
  } catch (error: any) {
    return false
  }
}
