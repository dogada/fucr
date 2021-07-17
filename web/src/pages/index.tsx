import { NextPage } from 'next'
import * as React from 'react'
import Layout from '../ui/Layout'

export const HomePage: NextPage = () => {
  return (
    <Layout title="FUCR">
      <div className="jumbotron">
        <h1>FUCR</h1>
        <h3>FUll Copy Right</h3>
      </div>
    </Layout>
  )
}

export default HomePage
