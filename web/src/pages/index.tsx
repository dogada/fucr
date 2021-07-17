import { NextPage } from 'next'
import * as React from 'react'
import { MessageForm } from '~/channel/forms/MessageForm'
import Layout from '../ui/Layout'

export const HomePage: NextPage = () => {
  return (
    <Layout title="FUCR">
      <div className="jumbotron">
        <h1>FUCR</h1>
        <h3>FUll Copy Right</h3>
      </div>
      <div>
        <label>
          <h5>New message</h5>
        </label>
        <MessageForm type="message" onFinish={() => null} />
      </div>
    </Layout>
  )
}

export default HomePage
