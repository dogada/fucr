import { HttpError } from '../lib/httperror'

const VALID_TYPES = 'title,message,comment'.split(',')

export function getMaxContentLength(type: string): number {
  validateType(type)
  return { title: 25, message: 500, comment: 200 }[type] || 500
}
export function validateType(type: string): void {
  if (!VALID_TYPES.includes(type))
    throw new HttpError(400, `Unknown type: '${type}'`)
}

export function validateContent(content: string, type: string): void {
  const maxLength = getMaxContentLength(type)
  if (content.length > maxLength) {
    throw new HttpError(
      400,
      `${type} content to long: ${content.length} > ${maxLength}`
    )
  }
}
