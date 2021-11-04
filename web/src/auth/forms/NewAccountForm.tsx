import clsx from 'clsx'
import createIpid from 'did-ipid'
import React, { ReactElement, ReactNode } from 'react'
import { useForm } from 'react-hook-form'
import { CancelButton } from '~/lib/forms/CancelButton'
import { SubmitButton } from '~/lib/forms/SubmitButton'
// import { dispatchError} from '~/store'
import { User } from '~/types'
import { initIpfs } from '~/utils/ipfs'
import { getMaxContentLength } from '~/utils/validation'
type FormData = {
  name: string
  pem: string
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

  const onSubmit = async ({ name, pem }: FormData) => {
    if (errors.name || !name || !pem) return
    //const did = await getDid(pem)
    //console.log({ did })
    //=> Returns the DID associated to a private key in PEM format.
    const ipfs = await initIpfs()
    const ipid = await createIpid(ipfs)
    const didDocument = await ipid.create(pem, (document) => {
      // const authentication = document.addAuthentication(publicKey.id)
      // const service = document.addService({
      //   id: 'hub',
      //   type: 'HubService',
      //   serviceEndpoint: 'https://hub.example.com/'
      // })
    })

    //const user = { name: data.name, id: '' + Date.now() }
    //localStorage.user = JSON.stringify(user)
    //onFinish(user)
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
        <textarea
          name="pem"
          rows={10}
          className={clsx('mt-3', errors.pem && 'is-invalid', 'form-control')}
          placeholder="Private RSA key (PKCS-8 format)"
          required
          ref={register({ required: true })}
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
