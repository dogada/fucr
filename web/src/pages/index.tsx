import { NextPage } from 'next'
import * as React from 'react'
import { MessageForm } from '~/channel/forms/MessageForm'
import { loremIpsum, name, username, Avatar } from 'react-lorem-ipsum'
import Layout from '~/ui/Layout'

export const HomePage: NextPage = () => (
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
      <div className="text-wrapper">
        {loremIpsum({ p: 3 }).map((text) => (
          <div className="mb-3" key={text}>
            <Avatar
              gender="male"
              className="mr-2"
              width="32"
              height="32"
              alt={'Name'}
            />
            <span>{name('male')}</span> @<strong>{username()}</strong>
            <br />
            {text}
          </div>
        ))}
      </div>
    </div>
  </Layout>
)

export default HomePage
