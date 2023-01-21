import Image from 'next/image'
import React, { useContext } from 'react'
import { DarkModeContext } from '../../context/darkmode_context'
import { H1 } from '../../styles/typography'
import { StyledLogoBar } from './styles'

type Props = {}




const LogoBar = (props: Props) => {

  const { darkMode } = useContext(DarkModeContext)


  return (
  <StyledLogoBar darkMode={darkMode}>
      <Image alt='main logo, three vertical lines of fading opacity' src={"/main_logo.svg"} height={15} width={15}></Image> 
      <H1 darkMode={darkMode}>Kanban</H1>   
  </StyledLogoBar>
  )
}

export default LogoBar