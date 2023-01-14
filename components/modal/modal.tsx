import React from 'react'
import { StyledModalBackground, StyledModalCenter } from './styles'

type Props = {
  children?: React.ReactNode,
  hidden: boolean,
  setHidden: Function,
}



const Modal = (props: Props) => {
  const { hidden, setHidden } = props
  
  console.log("?", hidden)

  if(hidden) return null

  return (
    <StyledModalBackground onClick={(e)=>{
        if(e.target !== e.currentTarget) return;
        setHidden(true)
      }}>
      <StyledModalCenter>
        {props.children}
      </StyledModalCenter>
    </StyledModalBackground>
  )
}

export default Modal