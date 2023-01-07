import { Auth, ThemeSupa, ThemeMinimal,  } from '@supabase/auth-ui-react'
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import useSWR from 'swr';
import { fetcher } from '../swr/config';
import { useEffect, useState } from 'react';


const Home = () => {
  const session = useSession()
  const supabase = useSupabaseClient()

  return (
    <div className="container" style={{ padding: '50px 0 100px 0' }}>
      {!session ? (
        <Auth 
        supabaseClient={supabase} 
        appearance={{ theme: ThemeSupa }} 
        theme="dark" 
        providers={['github', 'google', 'twitter', 'discord', 'slack', 'linkedin']}
        socialLayout='horizontal'
        />
      ) : (
        <div>
          home page
        </div>
      )}
    </div>
  )
}

export default Home