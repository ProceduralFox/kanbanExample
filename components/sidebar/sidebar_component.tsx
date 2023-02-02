import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import React, { useContext, useState } from 'react'

import { fetcher } from '../../swr/config'
import Link from 'next/link'
import { FullBoard } from '../../types/entities'
import { StyledSidebar, StyledSidebarBoard, StyledSidebarBoardsWrapper, StyledSidebarHidden, StyledSidebarHideButton, StyledSidebarTitle } from './styles'
import Image from 'next/image'
import { H3, H4 } from '../../styles/typography'
import { DarkModeContext } from '../../context/darkmode_context'
import { useRouter } from 'next/router'
import Modal from '../modal/modal'
import AddBoardForm from '../forms/add_board_form'
import ThemeButton from '../theme_button/theme_button'
import BoardsList from '../boards_list/boards_list'

type Props = {
  initialBoards: {id: string, name:string}[]
}


const Sidebar = (props: Props) => {
  const { darkMode } = useContext(DarkModeContext)
  const router = useRouter()
  const session = useSession()

  const [hidden, setHidden] = useState(false)
  const [modalHidden, setModalHidden] = useState(true);



  if(hidden){
    return <StyledSidebarHidden>
      <button onClick={()=>{setHidden(!hidden)}}>
        <Image alt='icon of an eye, to open sidebar' src={'/eye_icon.svg'} width={16} height={10}></Image>
      </button>
      </StyledSidebarHidden>
  }

  
  
  return (
    <>
      <StyledSidebar darkMode={darkMode}>
        <div style={{ width: "100%"}}>
          <BoardsList initialBoards={props.initialBoards}></BoardsList>
        </div>
        <div style={{width: "100%", justifySelf: "center"}}>
          <ThemeButton></ThemeButton>
          <StyledSidebarHideButton onClick={()=>{setHidden(!hidden)}}>
            <Image src={"/hide_icon.svg"} alt='crossed over eye' height={18} width={16}></Image>
            <H3 darkMode={darkMode}>Hide Sidebar</H3>
          </StyledSidebarHideButton>

        </div>
      </StyledSidebar>
    </>
  )
}

export default Sidebar