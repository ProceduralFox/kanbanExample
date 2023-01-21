import { Auth, ThemeSupa, ThemeMinimal,  } from '@supabase/auth-ui-react'
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import useSWR from 'swr';
import { fetcher } from '../swr/config';
import { useContext, useEffect, useState } from 'react';
import { boardUpdateSchema } from '../schemas/board_update';
import { z } from 'zod';
import Modal from '../components/modal/modal';
import Sidebar from '../components/sidebar/sidebar_component';
import LogoBar from '../components/logo_bar/logo_bar';
import { DarkModeContext } from '../context/darkmode_context';
import { DARK_GREY_2, WHITE } from '../styles/colours';
import { StyledBoard } from '../components/board/styles';
import { StyledHomepage } from '../components/layout/styles';
import { H1 } from '../styles/typography';




const Home = () => {
  const session = useSession()
  const supabase = useSupabaseClient()

  const { darkMode } = useContext(DarkModeContext)

  if (!session) {
    return (
      <div className="container">
        <Auth 
          supabaseClient={supabase} 
          appearance={{ theme: ThemeSupa }} 
          theme="dark" 
          providers={['github', 'google', 'twitter', 'discord', 'slack', 'linkedin']}
          socialLayout='horizontal'
        />
      </div>
    )
  }

  

  return (
    <>
      <div style={{background: darkMode?DARK_GREY_2:WHITE, width: "100%", height: "10%", display: "flex"}}>
        <LogoBar></LogoBar>
      </div>
      <div style={{display: "flex", height: "90%", width: "100%", background: darkMode?DARK_GREY_2:WHITE}}>
        <Sidebar></Sidebar>
        <StyledHomepage darkMode={darkMode}>
          <H1 darkMode={darkMode}>Select a board or create one from the sidebar to get started!</H1>
        </StyledHomepage>
      </div>
    </>
  ) 
}

export default Home