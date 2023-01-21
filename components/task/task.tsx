import React, { useContext, useState } from 'react'
import { Task, Subtask } from '../../types/responses'
import { StyledTask } from './styles'
import Modal from '../modal/modal'
import TaskForm from '../forms/task_form'
import DeleteForm from '../forms/delete_form'
import TaskDetail from '../task_detail/task_detail'
import { RED } from '../../styles/colours'
import { DarkModeContext } from '../../context/darkmode_context'
import { H3 } from '../../styles/typography'
import { mutate } from 'swr'



type Props = {
  task: Task
  columns: {name: string, id: string}[] 
}

const Task = (props: Props) => {
  const { task, columns } = props

  const getCompletedSubtasks = (subtasks: Subtask[])=>{
      let completed = 0

      for (const index in subtasks){
        const subtask = subtasks[index]

        if(subtask.completed) completed++
      }

      return completed
  }

  const { darkMode } = useContext(DarkModeContext)

  const [modalHidden, setModalHidden] = useState(true)
  const [modalContent, setModalContent] = useState<"view" | "edit" | "delete">("view")

  const handleDragStart = (e: React.DragEvent, id: string) => {
    e.dataTransfer.setData("taskId", id)
  }

  const hideAndReset = () => {
    setModalHidden(true)
    setModalContent("view")
    mutate(`/api/boards/${task.board_id}/`)
  }

  const getModalContent = (modalContent:"view" | "edit" | "delete" ) => {
    if(modalContent==="edit"){
      return <TaskForm setHidden={hideAndReset} task={task} columns={columns}></TaskForm>
    }
    if(modalContent==="delete") {
      return <DeleteForm id={task.id} boardId={task.board_id} name={task.name} type='task' setHidden={hideAndReset}></DeleteForm>
    }
    if(modalContent==="view"){
      const options = [
        {display: "Edit Task", click: ()=>{setModalContent("edit")}},
        {display: "Delete Task", click: ()=>{setModalContent("delete")}, colour: RED}
      ]
      return <TaskDetail columns={columns} task={task} dotMenuOptions={options}></TaskDetail>
    }
  }

  return (
    <>
      <StyledTask 
        darkMode={darkMode}
        draggable 
        onDragStart={(e)=>{handleDragStart(e, task.id)}} 
        key={task.id} 
        onClick={()=>{setModalHidden(false)}}>
        <H3 darkMode={darkMode}>{task.name}</H3>
        <p>{getCompletedSubtasks(task.subtasks)} of {task.subtasks.length} subtasks</p>
      </StyledTask>
      <Modal hidden={modalHidden} setHidden={hideAndReset} >
        {
          getModalContent(modalContent)
        }
      </Modal>
    </>

  )
}

export default Task