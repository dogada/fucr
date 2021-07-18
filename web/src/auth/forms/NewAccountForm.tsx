import React, { ReactElement, ReactNode } from 'react'
import { useForm } from 'react-hook-form'
import { debug } from '~/config'
// import { dispatchError} from '~/store'
import { User } from '~/types'
import { getMaxContentLength } from '~/utils/validation'
import { CancelButton } from '~/lib/forms/CancelButton'
import { SubmitButton } from '~/lib/forms/SubmitButton'
import clsx from 'clsx'

type FormData = {
  name: string
}

// eslint-disable-next-line complexity, max-lines-per-function
export function NewAccountForm({
  onFinish
}: {
  onFinish: (user?: User) => void
}): ReactElement {
  const {
    register,
    formState: { errors },
    handleSubmit
  } = useForm<FormData>({ defaultValues: {} })
  const maxLength = getMaxContentLength('title')
  const isInvalid = errors.name

  const onSubmit = async (data: FormData) => {
    debug('onSubmit', data)
    if (errors.name || !data.name) return
    const user = { name: data.name, id: '' + Date.now() }
    localStorage.user = JSON.stringify(user)
    onFinish(user)
  }

  return (
    <div className="mb-4">
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          name="name"
          ref={register({ required: true })}
          className={clsx(errors.name && 'is-invalid', 'form-control')}
          aria-invalid={!!errors.name}
          aria-label="User name"
          placeholder={`User name, maximum ${maxLength} characters.`}
          required
        />
        <div className="mt-2" />
        <FormFooter>
          <CancelButton onCancel={() => onFinish()} />
          <SubmitButton disabled={!!isInvalid} />
        </FormFooter>
      </form>
    </div>
  )
}

function FormFooter({ children }: { children: ReactNode }) {
  return (
    <div className="form-row justify-content-end align-items-center m-1">
      {children}
    </div>
  )
}
