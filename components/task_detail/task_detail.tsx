import React, { useContext, useState } from 'react'
import { H2, PL } from '../../styles/typography'
import { DarkModeContext } from '../../context/darkmode_context'
import { Task, Column } from '../../types/responses'
import { StyledFormButtonsSection, StyledFormSection, StyledFormWrapper } from '../forms/styles'
import { StyledSelect } from '../../styles/form_elements'
import DotMenu from '../dot_menu/dot_menu'
import { moveTask } from '../../functions/moveTask'
import SubtaskCheckbox from '../checkbox/checkbox'

type Props = {
  task: Task
  columns: {name: string, id: string}[]
  dotMenuOptions: {display:string, click:Function ,colour?: string}[]
  
}



const TaskDetail = (props: Props) => {
  const { task, columns, dotMenuOptions } = props
  const { darkMode } = useContext(DarkModeContext)

  const [selectedColumn, setSelectedColumn] = useState(task.column_id)

  // TODO - sbutasks handling
  
  return (
    <StyledFormWrapper darkMode={darkMode}>
      <StyledFormButtonsSection>
        <H2 darkMode={darkMode}>{task.name}</H2>
        <DotMenu options={dotMenuOptions}></DotMenu>
      </StyledFormButtonsSection>
      <StyledFormSection>
        <PL>{task.description}</PL>
      </StyledFormSection>
      <StyledFormSection>
        <PL>Subtasks</PL>
        {
          task.subtasks.map((subtask)=>{
            return <SubtaskCheckbox key={subtask.id} subtask={subtask}></SubtaskCheckbox>
          })
        }
      </StyledFormSection>
      {
        // moveTask(task.id, e.target.value)
      }
      <StyledFormSection>
        <StyledSelect darkMode={darkMode} value={selectedColumn} onChange={(e)=>{setSelectedColumn(e.target.value);}}>
          {
            columns.map((column, index)=>{
              return (
                <option value={column.id} key={column.id}>{column.name}</option>
              )
            })
          }
        </StyledSelect>
      </StyledFormSection>
    </StyledFormWrapper>
  )
}

export default TaskDetail