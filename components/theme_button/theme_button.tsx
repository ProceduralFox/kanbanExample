import React, { useContext, useState } from 'react'
import { StyledThemeButtonSelector, StyledThemeButtonWrapper } from './styles'
import { DarkModeContext } from '../../context/darkmode_context'
import Image from 'next/image'

type Props = {}



const ThemeButton = (props: Props) => {

  const { darkMode, setDarkMode  } = useContext(DarkModeContext)

  const [ballPosition, setBallPosition] = useState<"left"|"right">(darkMode?"left":"right")

  const handleThemeChange = () => {
    if(ballPosition==="left") {
      setBallPosition("right") 
      setDarkMode(false)
    } 
    else {
      setBallPosition("left")
      setDarkMode(true)
    }

  }

  return (
    <StyledThemeButtonWrapper darkMode={darkMode}>
      <div>
        <Image src={"/dark_icon.svg"} height={19} width={19} alt='dark mode icon'></Image>
        <StyledThemeButtonSelector onClick={()=>{handleThemeChange()}} ballPosition={ballPosition}></StyledThemeButtonSelector>
        <Image src={"/light_icon.svg"} height={19} width={19} alt='light mode icon'></Image>
      </div>
    </StyledThemeButtonWrapper>
  )
}

export default ThemeButton