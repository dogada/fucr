import { AffinidiWallet } from '@affinidi/wallet-browser-sdk'
import clsx from 'clsx'
import React, { ReactElement, ReactNode } from 'react'
import { useForm } from 'react-hook-form'
import { SubmitButton } from '~/lib/forms/SubmitButton'
import { dispatchError } from '~/store'
import { AFFINIDI_OPTIONS } from '~/config'

type FormData = {
  username: string // email or phone number
}

export function AffinidiSignInForm({
  username,
  onFinish
}: {
  username?: string
  onFinish: (result: { username: string; token: string }) => void
}): ReactElement {
  const {
    register,
    formState: { errors },
    handleSubmit
  } = useForm<FormData>({ defaultValues: { username } })
  const isInvalid = errors.username

  // TODO: add email validation
  const onSubmit = async ({ username }: FormData) => {
    if (errors.username || !username) return

    try {
      console.log('token')
      const token = await AffinidiWallet.initiateSignInPasswordless(
        AFFINIDI_OPTIONS,
        username
      )
      onFinish({ username, token })
    } catch (error) {
      dispatchError(error as Error)
    }
  }

  return (
    <div className="mb-4">
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          name="username"
          ref={register({ required: true })}
          className={clsx(errors.username && 'is-invalid', 'form-control')}
          aria-invalid={!!errors.username}
          aria-label="Email or phone"
          placeholder={`Email or mobile phone.`}
          required
        />
        <div className="mt-2" />
        <FormFooter>
          <SubmitButton title="Sign In" disabled={!!isInvalid} />
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
