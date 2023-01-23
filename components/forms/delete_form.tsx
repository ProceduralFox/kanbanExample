import React, { useContext, useState } from 'react'
import { DarkModeContext } from '../../context/darkmode_context'
import { StyledFormButtonsSection, StyledFormSection, StyledFormWrapper } from './styles'
import { H2, PL } from '../../styles/typography'
import { GREY_3, RED } from '../../styles/colours'
import { StyledButtonDestructive, StyledButtonPrimary, StyledButtonSecondary } from '../../styles/buttons'
import { deleteBoard } from '../../functions/deleteBoard'
import { deleteTask } from '../../functions/deleteTask'
import { useRouter } from 'next/router'

type Props = {
  type: "board"
  name: string
  id: string
  setHidden: Function
} | {
  type: "task"
  name: string
  id: string
  boardId: string
  setHidden: Function
}


const DeleteForm = (props: Props) => {
  const { darkMode } = useContext(DarkModeContext);
  const { type, name, id, setHidden } = props

  const router = useRouter()

  const handleDelete = ()=> {
    if(type==="board") {
      deleteBoard(id, {type: "mutate", mutateUrl: "/api/boards/"})
      router.push("/")
      return
    }
    deleteTask(id, {type:"mutate", mutateUrl:`/api/boards/${props.boardId}/`})
    setHidden()
  }

  
  return (
    <StyledFormWrapper darkMode={darkMode} setWidth='480px'>
      <StyledFormSection>
        <H2 darkMode={darkMode} color={RED}>Delete this {type}?</H2>
      </StyledFormSection>
      <StyledFormSection>
        <PL colour={GREY_3} >Are you sure you want to delete the ‘{name}’ {type}? This action will remove all {type===`board`?`columns and tasks`:`subtasks`} and cannot be reversed.</PL>
      </StyledFormSection>
      <StyledFormButtonsSection>
        <StyledButtonDestructive width='45%' onClick={()=>{handleDelete()}}>Delete</StyledButtonDestructive>
        <StyledButtonPrimary width='45%' onClick={()=>{setHidden(true)}}>Cancel</StyledButtonPrimary>
      </StyledFormButtonsSection>
    </StyledFormWrapper>
  )
}

export default DeleteForm