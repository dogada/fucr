import * as React from 'react'
import Layout from '~/ui/Layout'
import Button from 'react-bootstrap/Button'
import { useRouter } from 'next/router'
import { useMe } from '~/store'
import { AffinidiSignInForm } from '~/auth/forms/AffinidiSignInForm'
import { AffinidiConfirmationCodeForm } from '~/auth/forms/AffinidiConfirmationCodeForm'

type Screen = 'username' | 'code'

const LoginPage: React.FunctionComponent = () => {
  const router = useRouter()
  const [screen, setScreen] = React.useState<Screen>('username')
  const [token, setToken] = React.useState<unknown>()
  const { dispatch } = useMe()
  function login(user) {
    console.log('login', user)
    if (!user) return
    // TODO: prompt user to export account first
    dispatch('me/init')
    router.push('/')
  }
  function onUsername({ username, token }) {
    console.log('onUser', { username, token })
    setToken(token)
    setScreen('code')
  }
  return (
    <Layout title="Sign in using Affinidi">
      <h1>
        Sign in <small className="text-muted">(managed by Affinidi)</small>
      </h1>

      {screen === 'username' && <AffinidiSignInForm onFinish={onUsername} />}
      {screen === 'code' ? (
        <AffinidiConfirmationCodeForm
          userToken={token as string}
          onFinish={login}
        />
      ) : null}

      <p>
        If you have user account created early, you can import it from file.
      </p>
      <Button href="/auth/import">Import account</Button>
    </Layout>
  )
}

export default LoginPage
