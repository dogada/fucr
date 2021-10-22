import { AffinidiWallet } from '@affinidi/wallet-browser-sdk'
import clsx from 'clsx'
import React, { ReactElement, ReactNode } from 'react'
import { useForm } from 'react-hook-form'
import { SubmitButton } from '~/lib/forms/SubmitButton'
import { dispatchError } from '~/store'
import { AFFINIDI_OPTIONS } from '~/config'

type FormData = {
  code: string // email or phone number
}

export function AffinidiConfirmationCodeForm({
  userToken,
  onFinish
}: {
  userToken: string
  onFinish: (result: { wallet?: unknown; error?: Error }) => void
}): ReactElement {
  const {
    register,
    formState: { errors },
    handleSubmit
  } = useForm<FormData>({ defaultValues: {} })
  const isInvalid = errors.code

  // TODO: add email validation
  const onSubmit = async ({ code }: FormData) => {
    if (errors.code || !code) return

    try {
      const wallet = await AffinidiWallet.confirmSignIn(
        userToken,
        code,
        AFFINIDI_OPTIONS
      )
      onFinish({ wallet })
    } catch (error) {
      dispatchError(error as Error)
    }
  }

  return (
    <div className="mb-4">
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          name="code"
          ref={register({ required: true })}
          className={clsx(errors.code && 'is-invalid', 'form-control')}
          aria-invalid={!!errors.code}
          aria-label="Code"
          placeholder={`Code (6 digits).`}
          required
        />
        <div className="mt-2" />
        <FormFooter>
          <SubmitButton title="Submit" disabled={!!isInvalid} />
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
