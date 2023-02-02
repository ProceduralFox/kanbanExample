import Image from 'next/image'
import React, { useContext } from 'react'
import { DarkModeContext } from '../../context/darkmode_context'
import { H1 } from '../../styles/typography'
import { StyledLogoBar } from './styles'
import { useRouter } from 'next/router'
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import { StyledSignOut } from '../sidebar/styles'

type Props = {}

const LogoBar = (props: Props) => {

  const { darkMode } = useContext(DarkModeContext)
  const router = useRouter()
  const session = useSession()
  const supabase = useSupabaseClient()

  return (
  <StyledLogoBar darkMode={darkMode} onClick={()=>{router.push("/")}}>
      <Image alt='main logo, three vertical lines of fading opacity' src={"/main_logo.svg"} height={25} width={25}></Image> 
      <H1 darkMode={darkMode}>kanban</H1>
      {
        session?.user ?
          <StyledSignOut onClick={()=>{supabase.auth.signOut()}}>
            <Image src={"/sign-out-alt-solid.svg"} alt='sign out' height={18} width={16}></Image>
            {/* <H3>Sign Out</H3> */}
          </StyledSignOut>
            :
            null       
        }
  </StyledLogoBar>
  )
}

export default LogoBar