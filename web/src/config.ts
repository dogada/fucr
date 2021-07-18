export const NS = 'fucr'
import makeDebug from 'debug'

export const debug = makeDebug(NS)
export const logger = (scope: string): Function => debug.extend(scope)
export * from './meta'
