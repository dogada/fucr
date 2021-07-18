import clsx from 'clsx'
import React, { useState } from 'react'

const TEXTFIELD_LIMIT = 50

export const ContentField: React.FC<{
  initial?: string
  maxLength: number
  error: any
  register: any
}> = ({ maxLength, initial, error, register }) => {
  const [counter, setCounter] = useState<number>(initial ? initial.length : 0)
  const onTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    // @ts-ignore
    setCounter(e.target.value.length)
  }
  const invalid = counter === 0 || counter > maxLength
  const rows = maxLength < TEXTFIELD_LIMIT ? 1 : 5
  return (
    <div className="position-relative">
      <textarea
        name="content"
        ref={register && register({ required: true })}
        onChange={onTextChange}
        className={clsx(error && 'is-invalid', 'form-control')}
        aria-invalid={!!error}
        aria-label="Content of the record."
        rows={rows}
        placeholder={`Maximum ${maxLength} characters.`}
        required
      />
      <small className="position-absolute" style={{ right: 8, bottom: 2 }}>
        <span className={invalid ? 'text-danger' : ''}>{counter}</span> /{' '}
        {maxLength}
      </small>
    </div>
  )
}
