import React, { useContext, useState } from 'react'
import { StyledFormSection, StyledFormWrapper } from './styles'
import { DarkModeContext } from '../../context/darkmode_context'
import { H2 } from '../../styles/typography'
import { StyledInput, StyledLabel } from '../../styles/form_elements'
import { StyledButtonPrimary } from '../../styles/buttons'
import { addColumn } from '../../functions/addColumn'
import { mutate } from 'swr'
import { v4 as uuidv4 } from 'uuid'

type Props = {
  boardId: string,
  setHidden: Function,
}



const AddColumnForm = (props: Props) => {
  const { darkMode } = useContext(DarkModeContext);
  const { boardId, setHidden} = props

  
  
  const [name, setName] = useState("")
  
  const handleCreateColumn = () => {
    addColumn({board_id: boardId, name, id: uuidv4()}, { 
      type:"mutate", 
      mutateUrl: `/api/boards/${boardId}/`})
  }

  
  return (
    <StyledFormWrapper darkMode={darkMode}>
      <StyledFormSection>
        <H2 darkMode={darkMode}>Add New Board</H2>
      </StyledFormSection>
      <StyledFormSection>
        <StyledLabel darkMode={darkMode} htmlFor='name'>Column Name</StyledLabel>
        <StyledInput darkMode={darkMode} id='name' value={name} onChange={(e)=>{setName(e.target.value)}}></StyledInput>
      </StyledFormSection>
      <StyledButtonPrimary onClick={()=>{handleCreateColumn(); setHidden(true)}}>Create Column</StyledButtonPrimary>
    </StyledFormWrapper>
  )
}

export default AddColumnForm