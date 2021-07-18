import { User } from './types'

async function getMe(): Promise<User | undefined> {
  try {
    const json = localStorage.user
    return json && JSON.parse(json)
  } catch (e) {
    // do nothing
  }
}

export const api = {
  getMe
}
