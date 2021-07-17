export type Id = string
export type Slug = string
export type Timestamp = string
export type Lang = 'en' | 'uk' | 'ru'

export type Theme = 'dark' | 'light'
export type Dict = Record<string, unknown>

// TODO: type APIProxy = <Optional<values of API>>?

export type User = {
  name: string
  id: Id
}

export type Message = {
  id: string
  content: string
  user?: User
}
