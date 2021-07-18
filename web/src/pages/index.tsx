import { NextPage } from 'next'
import * as React from 'react'
import { MessageForm } from '~/channel/forms/MessageForm'
import { loremIpsum, name, username, Avatar } from 'react-lorem-ipsum'
import Layout from '~/ui/Layout'
import { useMe } from '~/store'
import Button from 'react-bootstrap/Button'

export const HomePage: NextPage = () => {
  const { me } = useMe()
  return (
    <Layout title="FUCR">
      <div className="jumbotron">
        <h1>FUCR — FUll Copy Right</h1>
        {!me && (
          <>
            <p className="lead mt-3">
              A digital publishing system where anyone can create and copy
              anything. When you like something, you get a copy of it, which is
              stored on your smartphone or computer.
            </p>
            <p className="lead">
              We do not own or control your data. Your data belongs to you. We
              simply provide a way to distribute your data to technologically
              and politically independent data providers in order to minimize
              the risk of censorship of any kind and to ensure that no data is
              lost even after many years.
            </p>
          </>
        )}
        {me && (
          <h4 className="mt-4">
            Welcome, {me.name}. Bellow is your unblockable data channel.
          </h4>
        )}
      </div>
      {me ? <Channel /> : <Setup />}
    </Layout>
  )
}

function Setup() {
  return (
    <div>
      <p>To start publishing and reading you need an account.</p>
      <p>
        Please
        <Button href="/auth/create" className="mx-2">
          Create new account
        </Button>{' '}
        or
        <Button href="/auth/import" className="mx-2">
          Import existing account
        </Button>
      </p>
    </div>
  )
}

function Channel() {
  return (
    <div>
      <label>New message</label>
      <MessageForm type="message" onFinish={() => null} />
      <div className="mt-1">
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
  )
}

export default HomePage
