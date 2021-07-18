import * as React from 'react'
import Button from 'react-bootstrap/Button'
import Layout from '~/ui/Layout'
import withMe from '~/ui/withMe'
import { useRouter } from 'next/router'
import { User } from '~/types'
import { useMe } from '~/store'

const LogoutForm = () => {
  const router = useRouter()
  const { dispatch } = useMe()
  function signOut() {
    // TODO: prompt user to export account first
    localStorage.user = undefined
    dispatch('me/init')
    router.push('/')
  }

  return (
    <form method="POST" action="/api/auth/logout" onSubmit={signOut}>
      <Button variant="danger" className="mt-4" type="submit">
        Sign Out
      </Button>
    </form>
  )
}

const AccountPage: React.FC<{ me: User }> = ({ me }) => {
  return (
    <Layout title={`Account`}>
      <h1>{me.name}</h1>
      <dl className="row">
        <dt className="col-sm-3">User id</dt>
        <dd className="col-sm-9">{me.id}</dd>
      </dl>
      <Button variant="info" className="mt-4" type="submit">
        Export account
      </Button>
      <LogoutForm />
    </Layout>
  )
}

export default withMe(AccountPage)
