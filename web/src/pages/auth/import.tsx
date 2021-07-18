import * as React from 'react'
import Button from 'react-bootstrap/Button'
import Layout from '~/ui/Layout'

const LoginPage: React.FunctionComponent = () => (
  <Layout title="About">
    <h1>Import existing user account</h1>
    <p>Please select a file to import account from.</p>
    <div className="custom-file mb-4">
      <input type="file" className="custom-file-input" id="account" />
      <label className="custom-file-label" htmlFor="account">
        Choose file
      </label>
    </div>
    <p>You can also create brand new user account.</p>
    <Button href="/auth/create">Create account</Button>
  </Layout>
)

export default LoginPage
