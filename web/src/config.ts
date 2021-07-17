export const NS = 'fucr'
import makeDebug from 'debug'
import { User } from './types'
export const debug = makeDebug(NS)
export const logger = (scope: string): Function => debug.extend(scope)

async function getMe(): Promise<User | undefined> {
  return undefined
}

export const api = {
  getMe
}
