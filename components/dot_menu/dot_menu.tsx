import Image from 'next/image'
import React, { useContext, useState } from 'react'
import { StyledDotMenuBackground, StyledDotMenuContent, StyledDotMenuWrapper } from './styles'
import { DarkModeContext } from '../../context/darkmode_context'
import { GREY_3 } from '../../styles/colours'

type Props = {
  options: {display: string, click: Function, colour?: string}[]
}


const DotMenu = (props: Props) => {
  const { options } = props

  const { darkMode } = useContext(DarkModeContext)

  

  const [open, setOpen] = useState(false)
  const [positions, setPositions] = useState({left:0, top:0})
  

  const handleDotClick = (e: React.MouseEvent<HTMLImageElement, MouseEvent>)=>{
    const viewportPositions = e.currentTarget.getBoundingClientRect();
    setPositions({left:viewportPositions.x, top: viewportPositions.y});
  }
  return (
    <>
    {
      open?<StyledDotMenuBackground open={open} onClick={(e)=>{setOpen(false)}}>
      </StyledDotMenuBackground> : null
    }

    <StyledDotMenuWrapper>
      <Image src={"/dot_menu_icon.svg"} alt='dot menu' width={5} height={20} onClick={(e)=>{setOpen(!open); handleDotClick(e)}}></Image>
      {
        open ? <StyledDotMenuContent positions={positions}  darkMode={darkMode}>
          {options.map((option, index)=>{
            return <li key={index} style={{color: `${option.colour?option.colour:GREY_3}`}} onClick={()=>{option.click();setOpen(false)}}>{option.display}</li>
          })} 
        </StyledDotMenuContent> : null
      }
    </StyledDotMenuWrapper>

    </>

  )
}

export default DotMenu