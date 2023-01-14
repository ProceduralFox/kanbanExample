import { useState } from 'react'
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { SessionContextProvider, Session, useSession } from '@supabase/auth-helpers-react'
import { AppProps } from 'next/app'
import Sidebar from '../components/sidebar/sidebar_component'
import { StyledLayout } from '../components/layout/styles'
import '../styles/globals.css'
import Layout from '../components/layout/layout'
import { DarkModeContext } from '../context/darkmode_context'

import { Plus_Jakarta_Sans } from '@next/font/google'

const jakarta = Plus_Jakarta_Sans({subsets: ['latin']})

function MyApp({
  Component,
  pageProps,
}: AppProps<{
  initialSession: Session,
}>) {
  const [supabase] = useState(() => createBrowserSupabaseClient())
  const session = useSession()

  const [darkMode, setDarkMode] = useState(true)

  console.log(session)
  return (
    <SessionContextProvider supabaseClient={supabase} initialSession={pageProps.initialSession}>
      {/* <Layout> */}
      <DarkModeContext.Provider value={{darkMode, setDarkMode}} >
        <main className={jakarta.className}>
          <Component {...pageProps} />
        </main>
      </DarkModeContext.Provider>
      {/* </Layout> */}
    </SessionContextProvider>
  )
}
export default MyApp