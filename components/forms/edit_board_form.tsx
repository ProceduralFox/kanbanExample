import React, { useContext, useState } from 'react'
import { StyledFormScrollableSection, StyledFormSection, StyledFormSubtaskWrapper, StyledFormWrapper } from './styles'
import { DarkModeContext } from '../../context/darkmode_context'
import { H2 } from '../../styles/typography'
import { StyledInput, StyledLabel } from '../../styles/form_elements'
import Image from 'next/image'
import { StyledButtonPrimary, StyledButtonSecondary } from '../../styles/buttons'
import { updateBoard } from '../../functions/updateBoard'
import { z } from 'zod'
import { boardUpdateSchema } from '../../schemas/board_update'
import { v4 } from 'uuid'

type Props = {
  setHidden: Function,
  board: z.infer<typeof boardUpdateSchema>,
}

const EditBoardForm = (props: Props) => {
  const { setHidden, board } = props
  const { darkMode } = useContext(DarkModeContext);

  const [columns, setColumns] = useState([...board.columns])
  const [name, setName] = useState(board.name)

  const handleColumnDelete = (targetIndex: number) => {
    const newColumns = columns.map((column, index)=>{
      if(index===targetIndex){
        column.toDelete = true
      }
      return column
    })

    setColumns(newColumns)
  }

  const handleColumnRename = (targetIndex: number, newName: string) => {
    const newColumns = columns.map((column, index)=>{
      if(index===targetIndex){
        column.name = newName
      }
      return column
    })

    setColumns(newColumns)
  }

  const handleColumnAdd = () => {
    const newColumns = [...columns]

    newColumns.push({name: "", board_id: board.id, id: v4()})

    setColumns(newColumns)
  }

  return (
    <StyledFormWrapper darkMode={darkMode}>
      <StyledFormSection>
        <H2 darkMode={darkMode}>Edit {board.name}</H2>
      </StyledFormSection>
    <form action="">
      <StyledFormSection>
        <StyledLabel darkMode={darkMode} htmlFor='name' >Board Name</StyledLabel>
        <StyledInput darkMode={darkMode} id='name' value={name} onChange={(e)=>{setName(e.target.value)}}></StyledInput>
      </StyledFormSection>
      <StyledFormSection>
          <StyledLabel darkMode={darkMode}>Board Columns</StyledLabel>
          <StyledFormScrollableSection>
          {
              columns.map((column, index)=>{
                if(column.toDelete) return null
                return ( <StyledFormSubtaskWrapper key={column.id}>
                    <StyledInput
                    onChange={(e)=>{handleColumnRename(index, e.target.value)}}
                    darkMode={darkMode} type="text" 
                    value={column.name} />
                    <Image 
                      onClick={()=>{handleColumnDelete(index)}}
                      src={"/x_icon.svg"} alt="removal icon" width={14.85} height={14.85}></Image>
                  </StyledFormSubtaskWrapper>
                )
              })
            }
          </StyledFormScrollableSection>
          <StyledButtonSecondary darkMode={darkMode} onClick={(e)=>{e.preventDefault(); handleColumnAdd()}}>Add Column</StyledButtonSecondary>
        </StyledFormSection>
        <StyledButtonPrimary onClick={(e)=>{e.preventDefault(); updateBoard({...board, columns: columns, name: name}, {type: "mutate", mutateUrl:`/api/boards/${board.id}/`}); setHidden(true)}}>Save Changes</StyledButtonPrimary>
    </form>


    </StyledFormWrapper>

  )
}

export default EditBoardForm