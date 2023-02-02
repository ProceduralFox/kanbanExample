import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import { Auth, ThemeSupa } from '@supabase/auth-ui-react'
import React, { useContext, useEffect } from 'react'
import { H1 } from '../../styles/typography'
import { DarkModeContext } from '../../context/darkmode_context'
import { mutate } from 'swr'

type Props = {
  showLogin: boolean
  children: JSX.Element
}


const AuthWrapper = (props: Props) => {
  const { showLogin, children } = props
  const supabase = useSupabaseClient()
  const session = useSession()

  const { darkMode } = useContext(DarkModeContext)

  useEffect(()=>{
    mutate("/api/boards/")
  }, [session])
  

  if(showLogin) {
    return (
      <>
      <H1 darkMode={darkMode}>Anyone can create or interact with the public boards on the left. To create a private one please sign in.</H1>
      <Auth 
        supabaseClient={supabase} 
        appearance={{ theme: ThemeSupa }} 
        theme="dark" 
        providers={['github', 'google']}
        socialLayout='horizontal'
      />
      </>

    )
  }

  return children
}

export default AuthWrapper