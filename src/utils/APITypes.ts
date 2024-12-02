export interface User {
  id: number,
  email: string,
  username: string,
  created_at: string,
  updated_at: string,
  jti: string
}

// These interfaces may change when I start introducing (more) serializers on the backend
export interface Channel {
  id: number,
  name: string,
  created_at: string,
  updated_at: string,
  server_id: number
}

export interface Server {
  id: number,
  name: string,
  created: string,
  defaultChannel: Channel
}

export interface Message {
  id: number,
  content: string,
  created_at: string,
  updated_at: string,
  user_id: number,
  channel_id: number
}
