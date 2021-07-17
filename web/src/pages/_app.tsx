import { AppProps } from 'next/app'
import { StoreonProvider } from '~/store'
import Root from '~/ui/Root'
import '../styles/light.scss'

function MyApp({ Component, pageProps }: AppProps): React.ReactElement {
  console.log('MyApp.init')
  return (
    <StoreonProvider>
      <Root>
        <Component {...pageProps} />
      </Root>
    </StoreonProvider>
  )
}

export default MyApp
