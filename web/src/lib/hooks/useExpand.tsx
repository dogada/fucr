import { useState } from 'react'

export type Expand = {
  id?: string
  toggle: (id: string) => void
  setExpanded: (id?: string) => void
  isExpanded: (id: string) => boolean
}

export function useExpand(initial?: string): Expand {
  const [expandedId, setExpanded] = useState<string | undefined>(initial)
  const toggle = (id) => setExpanded(id === expandedId ? undefined : id)
  const isExpanded = (id) => expandedId === id
  return { id: expandedId, toggle, setExpanded, isExpanded }
}
