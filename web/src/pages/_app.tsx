import { UserProvider } from '@auth0/nextjs-auth0'
import '../styles/global.css';

function MyApp({ Component, pageProps }) {
  return (
    <UserProvider>
      <Component {...pageProps} />
    </UserProvider>
  )
}

export default MyApp
