export const NS = 'fucr'
import makeDebug from 'debug'
import { Types as AffinidiTypes } from '@affinidi/wallet-browser-sdk'
export const debug = makeDebug(NS)
export const logger = (scope: string): Function => debug.extend(scope)
export * from './meta'

export const AFFINIDI_OPTIONS: AffinidiTypes.SdkOptions = {
  env: process.env.NEXT_PUBLIC_AFFINIDI_ENV as AffinidiTypes.Env,
  apiKey: process.env.NEXT_PUBLIC_AFFINIDI_API_KEY
}

console.log(AFFINIDI_OPTIONS)
