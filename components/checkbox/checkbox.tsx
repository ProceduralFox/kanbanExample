import React, { useContext, useState } from 'react'
import { StyledSubtaskCheckboxText, StyledSubtaskCheckboxWrapper, StyledVisibleCheckbox } from './styles'
import { DarkModeContext } from '../../context/darkmode_context'
import Image from 'next/image'
import { Subtask} from '../../types/entities'
import { completeSubtask } from '../../functions/completeSubtask'

type Props = {
  subtask: Subtask
  setSubtasks: Function
}



const SubtaskCheckbox = (props: Props) => {
  const { darkMode } = useContext(DarkModeContext)
  const { subtask } = props

  const [completed, setCompleted] = useState(subtask.completed)

  const handleClick = () => {
    completeSubtask(subtask.id, !completed, {type:"state", currentState: completed, setState: setCompleted})
  }

  return <StyledSubtaskCheckboxWrapper onClick={()=>handleClick()} darkMode={darkMode}>
    <StyledVisibleCheckbox darkMode={darkMode} selected={completed}>
      <Image alt='check' src={"/check_icon.svg"} width={10} height={10}></Image>
    </StyledVisibleCheckbox>
    <StyledSubtaskCheckboxText completed={completed} darkMode={darkMode}>{subtask.name}</StyledSubtaskCheckboxText>
  </StyledSubtaskCheckboxWrapper>
}

export default SubtaskCheckbox