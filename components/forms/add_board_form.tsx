import React, { useContext, useState } from 'react'
import { StyledFormSection, StyledFormSubtaskWrapper, StyledFormWrapper } from './styles'
import { DarkModeContext } from '../../context/darkmode_context'
import { H2 } from '../../styles/typography'
import { StyledInput, StyledLabel } from '../../styles/form_elements'
import Image from 'next/image'
import { StyledButtonPrimary, StyledButtonSecondary } from '../../styles/buttons'
import { createBoard } from '../../functions/createBoard'
import { v4 } from 'uuid'

type Props = {
  setHidden: Function,
}

const AddBoardForm = (props: Props) => {
  const { setHidden } = props
  const { darkMode } = useContext(DarkModeContext);

  const [columns, setColumns] = useState<{name: string, id:string}[]>([])
  const [name, setName] = useState("")

  const handleDeleteColumn = (targetIndex: number) => {
    const newColumns = [] 
    for (const index in columns){
      if(targetIndex!==parseInt(index)) newColumns.push(columns[index])
    }
    setColumns(newColumns)
  }

  const handleRenameColumn = (targetIndex: number, newName: string) => {
    const newColumns = columns.map((column, index)=>{
      if (index===targetIndex) return {...column, name: newName}
      return column
    })

    setColumns(newColumns)
  }

  const handleAddColumn = (name: string) =>{
    const newColumns = [...columns]
    newColumns.push({name: name, id: v4()})

    setColumns(newColumns)
  }

  return (
    <StyledFormWrapper darkMode={darkMode}>
      <StyledFormSection>
        <H2 darkMode={darkMode}>Add New Board</H2>
      </StyledFormSection>
    <form action="">
      <StyledFormSection>
        <StyledLabel darkMode={darkMode} htmlFor='name' >Board Name</StyledLabel>
        <StyledInput darkMode={darkMode} id='name' value={name} onChange={(e)=>{setName(e.target.value)}}></StyledInput>
      </StyledFormSection>
      <StyledFormSection>
          <StyledLabel darkMode={darkMode}>Board Columns</StyledLabel>
          <ul style={{width: "100%", padding: "0"}}>
          {
              columns.map((column, index)=>{
                return ( <StyledFormSubtaskWrapper key={`${column}-${index}`}>
                    <StyledInput
                    onChange={(e)=>{handleRenameColumn(index, e.target.value)}}
                    darkMode={darkMode} type="text" value={column.name} />
                    <Image 
                      onClick={()=>{handleDeleteColumn(index)}}
                      src={"/x_icon.svg"} alt="removal icon" width={14.85} height={14.85}></Image>
                  </StyledFormSubtaskWrapper>
                )
              })
            }
          </ul>
          <StyledButtonSecondary darkMode={darkMode} onClick={(e)=>{e.preventDefault();handleAddColumn("")}}>Add Column</StyledButtonSecondary>
        </StyledFormSection>
        <StyledButtonPrimary onClick={(e)=>{e.preventDefault(); createBoard({name: name, columns: columns}, {type:"mutate", mutateUrl:"/api/boards/"}); setHidden(true)}}>Create New Board</StyledButtonPrimary>
    </form>


    </StyledFormWrapper>

  )
}

export default AddBoardForm