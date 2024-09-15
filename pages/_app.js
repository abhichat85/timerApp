import { ThemeProvider } from 'next-themes'
import '../styles/globals.css'
import DragDropProvider from '../components/DragDropProvider'
import { ClerkProvider } from '@clerk/nextjs'

function MyApp({ Component, pageProps }) {
  return (
    <ClerkProvider>
      <ThemeProvider attribute="class">
        <DragDropProvider>
          <Component {...pageProps} />
        </DragDropProvider>
      </ThemeProvider>
    </ClerkProvider>
  )
}

export default MyApp