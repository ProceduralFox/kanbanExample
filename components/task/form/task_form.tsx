import React, { useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Task, Subtask } from '../../../types/responses'
import { taskUpdateSubtasks } from '../../../schemas/task_update'
import { z } from 'zod'
import { StyledButtonDestructive, StyledButtonPrimary, StyledButtonSecondary } from '../../../styles/buttons'
import { StyledInput, StyledLabel, StyledSelect, StyledTextArea } from '../../../styles/form_elements'
import { StyledFormSection, StyledFormSubtaskWrapper, StyledFormWrapper } from './styles'
import { DarkModeContext } from '../../../context/darkmode_context'
import { H2 } from '../../../styles/typography'
import { updateTask } from '../../../functions/updateTask'
import Image from 'next/image'
import { createTask } from '../../../functions/createTask'

type Props = {
  task?: Task
  columns: {name: string, id: string}[]
  board_id?: string
  mutate: Function
  setHidden: Function
}


const TaskForm = (props: Props) => {
  const { task, columns, mutate, setHidden, board_id } = props

  const { darkMode } = useContext(DarkModeContext)

  const [subtasks, setSubtasks] = useState<z.infer<typeof taskUpdateSubtasks>[]>(task?task.subtasks:[])

  const [title, setTitle] = useState(task?task.name:"")
  const [description, setDescription] = useState(task?task.description:"")
  const [column, setColumn] = useState(task?task.column_id:columns[0].id)
  
  const handleAddSubtask = () => {
    const newSubtasks = [...subtasks]

    newSubtasks.push({name: "", completed: false, task_id: task?task.id:""})

    setSubtasks(newSubtasks)
  }

  const handleSubmit = (mutate: Function, task?: Task) => {
    if(task){
      const updateBody = {
        task: {
          id: task.id,
          name: title,
          description: description,
          column_id: column,
          board_id: task.board_id
        },
        subtasks:[...subtasks]
      }
  
      updateTask(updateBody, mutate)
    } else {
      if(!board_id) return null // TODO: add FE error handling with toastify here

      const createBody = {
        task: {
          name: title,
          description: description,
          column_id: column,
          board_id: board_id
        },
        subtasks:[...subtasks]
      }

      createTask(createBody, mutate)

    }

    setHidden(true)
  }

  const handleSubtaskDelete = (targetIndex: number) => {
    const newSubtasks = subtasks.map((subtask, index)=>{
      if(index===targetIndex){
        subtask.toDelete = true
      }
      return subtask
    })

    setSubtasks(newSubtasks)
  }

  const handleSubtaskRename = (targetIndex: number, newName: string) => {
    const newSubtasks = subtasks.map((subtask, index)=>{
      if(index===targetIndex){
        subtask.name = newName
      }
      return subtask
    })

    setSubtasks(newSubtasks)
  }

  return (
    <StyledFormWrapper darkMode={darkMode}>
      <StyledFormSection>
        <H2 darkMode={darkMode}>{task?"Edit Task":"Add New Task"}</H2>
      </StyledFormSection>
      <form action="">
        <StyledFormSection>
          <StyledLabel darkMode={darkMode} htmlFor="title">Title</StyledLabel>
          <StyledInput darkMode={darkMode} type="text" id='title' value={title} onChange={(e)=>{setTitle(e.target.value)}} />
        </StyledFormSection>
        <StyledFormSection>
          <StyledLabel darkMode={darkMode} htmlFor="description">Description</StyledLabel>
          <StyledTextArea darkMode={darkMode} id='description' value={description} onChange={(e)=>{setDescription(e.target.value)}}  />
        </StyledFormSection>
        <StyledFormSection>
          <StyledLabel darkMode={darkMode}>Subtasks</StyledLabel>
          <ul style={{width: "100%", padding: "0"}}>
            {
              subtasks.map((subtask, index)=>{
                if(subtask.toDelete) return null
                return ( <StyledFormSubtaskWrapper>
                    <StyledInput
                    onChange={(e)=>{handleSubtaskRename(index, e.target.value)}}
                    darkMode={darkMode} type="text" value={subtasks[index].name} />
                    <Image 
                      onClick={()=>{handleSubtaskDelete(index)}}
                      src={"/x_icon.svg"} alt="removal icon" width={14.85} height={14.85}></Image>
                  </StyledFormSubtaskWrapper>
                )
              })
            }
          </ul>
          <StyledButtonSecondary darkMode={darkMode} onClick={(e)=>{e.preventDefault(); handleAddSubtask()}}>Add subtask</StyledButtonSecondary>
        </StyledFormSection>
        <StyledFormSection>
          <StyledLabel darkMode={darkMode} htmlFor="status">Status</StyledLabel>
          <StyledSelect darkMode={darkMode} name="" id="status" value={column} onChange={(e)=>{setColumn(e.target.value)}}>
              {
                columns.map((col, index)=>{
                  return (
                    <option key={col.id} value={col.id}>{col.name}</option>
                  )
                })
              }
          </StyledSelect>
        </StyledFormSection>
        <StyledButtonPrimary onClick={(e)=>{e.preventDefault();handleSubmit(mutate, task)}}>{task?"Save Changes":"Create Task"}</StyledButtonPrimary>
      </form>
    </StyledFormWrapper>
  )
}

export default TaskForm