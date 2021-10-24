import { AffinidiWallet } from '@affinidi/wallet-browser-sdk'
import clsx from 'clsx'
import React, { ReactElement, ReactNode } from 'react'
import { useForm } from 'react-hook-form'
import { SubmitButton } from '~/lib/forms/SubmitButton'
import { dispatchAlert, dispatchError } from '~/store'
import { AFFINIDI_OPTIONS } from '~/config'
import { Button } from '~/ui/utils/buttons'

type FormData = {
  code: string // email or phone number
}

export type ConfirmationResult = {
  wallet?: unknown
  error?: Error
}

export function AffinidiConfirmationCodeForm({
  username,
  userToken,
  onFinish
}: {
  username: string
  userToken: string
  onFinish: (res: ConfirmationResult) => void
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
      const { wallet } = await AffinidiWallet.completeSignInPasswordless(
        AFFINIDI_OPTIONS,
        userToken,
        code
      )
      onFinish({ wallet })
    } catch (e) {
      const error = e as Error
      dispatchError(error)
      onFinish({ error })
    }
  }

  async function resendCode() {
    try {
      await AffinidiWallet.resendSignUpConfirmationCode(
        username,
        AFFINIDI_OPTIONS
      )
      dispatchAlert('info', 'Code is sent')
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
          ref={register({ required: true, minLength: 6, maxLength: 6 })}
          className={clsx(errors.code && 'is-invalid', 'form-control')}
          aria-invalid={!!errors.code}
          aria-label="Code"
          placeholder={`Code (6 digits).`}
          required
        />
        <div className="mt-2" />
        <FormFooter>
          <Button classes="mx-2 btn-secondary" onClick={resendCode}>
            Resend code
          </Button>

          <SubmitButton title="Verify code" disabled={!!isInvalid} />
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
