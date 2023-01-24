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
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { Database } from '../types/supabase';
import { useWindowSize } from '../hooks/useWindowSize';
import TopBar from '../components/top_bar/top_bar';
import BoardsList from '../components/boards_list/boards_list';
import { StyledButtonPrimary } from '../styles/buttons';
import AddBoardForm from '../components/forms/add_board_form';
import ThemeButton from '../components/theme_button/theme_button';


type Props = {
  serverBoards: {id: string, name:string}[]
}


const Home = (props: Props) => {
  const session = useSession()
  const supabase = useSupabaseClient()

  const size = useWindowSize()
  
  const { serverBoards } = props

  const [addBoardHidden, setAddBoardHidden] = useState(true)

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


  
  if(size.width && size.width<600 ){
    return <>
    <div style={{background: "hotpink", width: "100%", height: "10%", display: "flex"}}>
      <LogoBar></LogoBar>
    </div>
    <div style={{display: "flex", height: "90%", width: "100%", background: darkMode?DARK_GREY_2:WHITE}}>
      <StyledHomepage darkMode={darkMode}>
        <BoardsList initialBoards={serverBoards} ></BoardsList>
        <ThemeButton></ThemeButton>
      </StyledHomepage>
    </div>
  </>
  }

  
  
  return (
    <>
      <div style={{background: darkMode?DARK_GREY_2:WHITE, width: "100%", height: "10%", display: "flex"}}>
        <LogoBar></LogoBar>
      </div>
      <div style={{display: "flex", height: "90%", width: "100%", background: darkMode?DARK_GREY_2:WHITE}}>
        <Sidebar initialBoards={props.serverBoards}></Sidebar>
        <StyledHomepage darkMode={darkMode}>
          {
            serverBoards.length === 0 ?
            <>
              <H1 darkMode={darkMode}>You have no boards. Create one to get started!</H1>
              <StyledButtonPrimary onClick={()=>{setAddBoardHidden(false)}} >+ Create New Board</StyledButtonPrimary>
              <Modal hidden={addBoardHidden} setHidden={setAddBoardHidden} ><AddBoardForm setHidden={setAddBoardHidden}></AddBoardForm></Modal>
            </>

            :
            <H1 darkMode={darkMode}>Select a board or create a new one from the sidebar.</H1>
          }
        </StyledHomepage>
      </div>
    </>
  ) 
}

export async function getServerSideProps( context:any ) {
  const { req, res } = context
  console.log(req.query, "#############")

  // const res = await fetch(`http://localhost:3001/api/boards`)
  const supabase = createServerSupabaseClient<Database>({ req, res })
  
  let { data: boards, error } = await supabase
  .from('boards')
  .select('name, id')


  return { props: { serverBoards: boards } }
}

export default Home