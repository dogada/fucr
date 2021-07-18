import * as React from 'react'
import Layout from '~/ui/Layout'
import Button from 'react-bootstrap/Button'
import { NewAccountForm } from '~/auth/forms/NewAccountForm'
import { useRouter } from 'next/router'
import { useMe } from '~/store'

const LoginPage: React.FunctionComponent = () => {
  const router = useRouter()
  const { dispatch } = useMe()
  function login(user) {
    if (!user) return
    // TODO: prompt user to export account first
    dispatch('me/init')
    router.push('/')
  }

  return (
    <Layout title="Create account">
      <h1>Create new user account</h1>
      <NewAccountForm onFinish={login} />
      <p>If you have user account created early, you can import it.</p>
      <Button href="/auth/import">Import account</Button>
    </Layout>
  )
}

export default LoginPage
