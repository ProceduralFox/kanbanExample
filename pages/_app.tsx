import { useState } from 'react'
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { SessionContextProvider, Session, useSession } from '@supabase/auth-helpers-react'
import { AppProps } from 'next/app'
import Sidebar from '../components/sidebar/sidebar_component'

function MyApp({
  Component,
  pageProps,
}: AppProps<{
  initialSession: Session,
}>) {
  const [supabase] = useState(() => createBrowserSupabaseClient())
  const session = useSession()

  console.log(session)
  return (
    <SessionContextProvider supabaseClient={supabase} initialSession={pageProps.initialSession}>
      <Sidebar></Sidebar>
      <Component {...pageProps} />
    </SessionContextProvider>
  )
}
export default MyApp