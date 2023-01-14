import { Auth, ThemeSupa, ThemeMinimal,  } from '@supabase/auth-ui-react'
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import useSWR from 'swr';
import { fetcher } from '../swr/config';
import { useEffect, useState } from 'react';
import { boardUpdateSchema } from '../schemas/board_update';
import { z } from 'zod';
import Modal from '../components/modal/modal';
import Sidebar from '../components/sidebar/sidebar_component';

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
          <Sidebar></Sidebar>
          Please select a board from the menu.
          c
        </div>
      )}
    </div>
  )
}

export default Home