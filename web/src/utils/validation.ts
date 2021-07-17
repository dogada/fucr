import { HttpError } from '../lib/httperror'

const VALID_TYPES = 'entity,category,note,field,fieldset'.split(',')

export function getMaxContentLength(type: string): number {
  validateType(type)
  return { category: 25, entity: 40, field: 25 }[type] || 500
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
