// These interfaces will change when I start introducing (more) serializers on the backend

interface UserError {
  type: string,
  message: string
}

interface User {
  id: number,
  username: string,
  image: string,
  status?: string,
  created_at: string,
  updated_at: string
}

interface Channel {
  id: number,
  name: string,
  created_at: string,
  updated_at: string,
  server_id: number
}

interface Server {
  id: number,
  name: string,
  created: string,
  image: string,
  defaultChannel: Channel,
  owner: User
}

interface Message {
  id: number,
  content: string,
  timestamp: number,
  edit_timestamp: number,
  edited: boolean
  author: User
}
