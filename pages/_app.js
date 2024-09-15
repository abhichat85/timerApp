import { ThemeProvider } from 'next-themes'
import '../styles/globals.css'
import DragDropProvider from '../components/DragDropProvider'
import { ClerkProvider } from '@clerk/nextjs'

function MyApp({ Component, pageProps }) {
  return (
    <ClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}>
      <ThemeProvider attribute="class">
        <DragDropProvider>
          <Component {...pageProps} />
        </DragDropProvider>
      </ThemeProvider>
    </ClerkProvider>
  )
}

export default MyApp