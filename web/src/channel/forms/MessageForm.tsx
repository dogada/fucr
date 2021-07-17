import React, { ReactElement, ReactNode } from 'react'
import { useForm } from 'react-hook-form'
import { debug } from '~/config'
// import { dispatchError} from '~/store'
import { Message } from '~/types'
import { getMaxContentLength } from '~/utils/validation'
import { ContentField } from './ContentField'
import { CancelButton } from '~/lib/forms/CancelButton'
import { SubmitButton } from '~/lib/forms/SubmitButton'

type FormData = {
  content: string
}

// eslint-disable-next-line complexity, max-lines-per-function
export function MessageForm({
  parent,
  type,
  onFinish
}: {
  parent?: Message
  type: string
  onFinish: (message?: Message) => void
}): ReactElement {
  const {
    register,
    formState: { errors },
    handleSubmit
  } = useForm<FormData>({ defaultValues: {} })
  const maxContentLength = getMaxContentLength(type)
  console.log('MessageForm', { type })
  const isInvalid = errors.content

  const onSubmit = async (data: FormData) => {
    debug('onSubmit', data)
    if (errors.content || !data.content) return
    // TODO: clear input

    // return await api
    //   .createMessage({
    //     data: { ...data, type },
    //     parentId: parent && parent.id
    //   })
    //   .then(onFinish)
    //   .catch(dispatchError)
    onFinish()
  }

  return (
    <div className="mb-4">
      <form onSubmit={handleSubmit(onSubmit)}>
        <ContentField
          register={register}
          error={errors.content}
          maxLength={maxContentLength}
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

export type IRegister = (params?: Object) => any

function FormFooter({ children }: { children: ReactNode }) {
  return (
    <div className="form-row justify-content-end align-items-center m-1">
      {children}
    </div>
  )
}
