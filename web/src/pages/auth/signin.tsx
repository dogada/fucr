import * as React from 'react'
import Layout from '~/ui/Layout'
import Button from 'react-bootstrap/Button'
import { useRouter } from 'next/router'
import { useMe } from '~/store'

import { AffinidiSignInForm } from '~/auth/forms/AffinidiSignInForm'

const LoginPage: React.FunctionComponent = () => {
  const router = useRouter()
  const { dispatch } = useMe()
  function login(user) {
    //TODO: check code
    console.log('login', user)
    if (!user) return
    // TODO: prompt user to export account first
    dispatch('me/init')
    router.push('/')
  }

  return (
    <Layout title="Sign in using Affinidi">
      <h1>
        Sign in <small className="text-muted">(managed by Affinidi)</small>
      </h1>
      <AffinidiSignInForm onFinish={login} />
      <p>
        If you have user account created early, you can import it from file.
      </p>
      <Button href="/auth/import">Import account</Button>
    </Layout>
  )
}

export default LoginPage
