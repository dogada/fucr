import * as React from 'react'
import Layout from '~/ui/Layout'
import Button from 'react-bootstrap/Button'

const LoginPage: React.FunctionComponent = () => (
  <Layout title="Create account">
    <h1>Create new user account</h1>

    <p>If you have user account created early, you can import it.</p>
    <Button href="/auth/import">Import account</Button>
  </Layout>
)

export default LoginPage
