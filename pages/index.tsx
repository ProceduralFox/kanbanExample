import { Auth, ThemeSupa, ThemeMinimal,  } from '@supabase/auth-ui-react'
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import { useContext, useEffect, useState } from 'react';
import Modal from '../components/modal/modal';
import Sidebar from '../components/sidebar/sidebar_component';
import LogoBar from '../components/logo_bar/logo_bar';
import { DarkModeContext } from '../context/darkmode_context';
import { DARK_GREY_2, PURPLE, WHITE } from '../styles/colours';
import { StyledHomepage, StyledLoginPage } from '../components/layout/styles';
import { H1, H3 } from '../styles/typography';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { Database } from '../types/supabase';
import { useWindowSize } from '../hooks/useWindowSize';
import BoardsList from '../components/boards_list/boards_list';
import { StyledButtonPrimary } from '../styles/buttons';
import AddBoardForm from '../components/forms/add_board_form';
import ThemeButton from '../components/theme_button/theme_button';
import ProgressLoading from '../components/progress_suspense/progress_loading';
import Image from 'next/image';
import AuthWrapper from '../components/auth/auth_wrapper';
import { StyledSidebarHideButton, StyledSignOut } from '../components/sidebar/styles';

type Props = {
  serverBoards: {id: string, name:string}[],
  isPageLoading: boolean
}


const Home = (props: Props) => {

  const size = useWindowSize()
  
  const { serverBoards, isPageLoading } = props

  const [addBoardHidden, setAddBoardHidden] = useState(true)

  const { darkMode } = useContext(DarkModeContext)

  // if (!session) {
  //   return (
  //     <>
  //     <StyledLoginPage darkMode={darkMode}>
  //         <H1 darkMode={darkMode} style={{borderBottom: `5px dotted ${PURPLE}`}}>kanban</H1>   
  //       <Auth 
  //         supabaseClient={supabase} 
  //         appearance={{ theme: ThemeSupa }} 
  //         theme="dark" 
  //         providers={['github', 'google']}
  //         socialLayout='horizontal'
  //       />

  //     </StyledLoginPage>
  //     </>
  //   )
  // }
  
  if(size.width && size.width<600 ){
    return <>
    <div style={{width: "100%", height: "10%", display: "flex"}}>
      <LogoBar></LogoBar>
    </div>
    <div style={{display: "flex", height: "90%", width: "100%", background: darkMode?DARK_GREY_2:WHITE}}>
      <StyledHomepage darkMode={darkMode}>
        <ProgressLoading isLoading={isPageLoading}>
          <AuthWrapper>
            <>
              <BoardsList initialBoards={serverBoards} ></BoardsList>
              <ThemeButton></ThemeButton>
            </>
          </AuthWrapper>
        </ProgressLoading>
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
          <ProgressLoading isLoading={props.isPageLoading}>
            <AuthWrapper>
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
            </AuthWrapper>
          </ProgressLoading>
        </StyledHomepage>
      </div>
    </>
  ) 
}

export async function getServerSideProps( context:any ) {
  const { req, res } = context

  // const res = await fetch(`http://localhost:3001/api/boards`)
  const supabase = createServerSupabaseClient<Database>({ req, res })
  // console.log("SSR keeps cookie?")
  
  let { data: boards, error } = await supabase
  .from('boards')
  .select('name, id')


  return { props: { serverBoards: boards } }
}

export default Home