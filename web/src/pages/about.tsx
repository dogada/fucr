import Link from 'next/link'
import * as React from 'react'

import Layout from '../ui/Layout'

const AboutPage: React.FunctionComponent = () => (
  <Layout title="About">
    <h1>FUCR — FUll Copy Right</h1>

    <p>
      A digital publishing system where anyone can create and copy anything.
      When you like something, you get a copy of it, which is stored on your
      smartphone or computer. Such a copy can be shared with your subscribers,
      even if the original source is not available for some reason. Important
      things get more copies in different independent locations and are
      therefore less likely to get lost or censored.
    </p>

    <p>
      Each piece of content is signed by the author using cryptography (as in
      blockchain technologies, where users sign transactions with their private
      keys).
    </p>

    <p>
      We do not own or control your data. Your data belongs to you. We simply
      provide a way to distribute your data to technologically and politically
      independent data providers in order to minimize the risk of censorship of
      any kind.
    </p>

    <p>
      We believe that corporate or government censorship should and can be
      replaced by individual responsibility. If you create and share the good
      things, why should someone have the right to ban you? If someone does bad
      things, the police should take care of it, not the censors.
    </p>

    <p>Have questions? Our email: info@dogada.org.</p>

    <Link href="/">
      <a className="btn btn-primary">Start now</a>
    </Link>
  </Layout>
)

export default AboutPage
