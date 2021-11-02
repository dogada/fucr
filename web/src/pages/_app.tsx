import { AppProps } from 'next/app'
import { create } from 'ipfs-http-client'

import { StoreonProvider } from '~/store'
import Root from '~/ui/Root'
import '../styles/light.scss'

function MyApp({ Component, pageProps }: AppProps): React.ReactElement {
  console.log('MyApp.init')
  initIpfs()
  return (
    <StoreonProvider>
      <Root>
        <Component {...pageProps} />
      </Root>
    </StoreonProvider>
  )
}
async function initIpfs() {
  console.log('initIpfs')
  const url = new URL(process.env.NEXT_PUBLIC_IPFS_ENDPOINT as string)
  try {
    const ipfs = create({
      host: url.host,
      port: parseInt(url.port),
      protocol: url.protocol,
      headers: {
        authorization: process.env.NEXT_PUBLIC_IPFS_AUTH as string
      }
    })
    const res = await ipfs.add('Hello, world!')
    console.log('res', res)
  } catch (e) {
    console.error('initIpfs', e)
  }
}

export default MyApp
