import Link from 'next/link'
import * as React from 'react'

import Layout from '../ui/Layout'

const AboutPage: React.FunctionComponent = () => (
  <Layout title="About">
    <h1>FUCR</h1>

    <p>
      <Link href="/">
        <a className="btn btn-primary">Start now</a>
      </Link>
    </p>
  </Layout>
)

export default AboutPage
