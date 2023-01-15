import React, { useState } from 'react'
import { Task, Subtask } from '../../types/responses'
import { StyledTask } from './styles'
import Modal from '../modal/modal'
import TaskForm from '../form/task_form'


type Props = {
  task: Task
  columns: {name: string, id: string}[]
  mutate: Function
}

const Task = (props: Props) => {
  const { task, columns, mutate } = props

  const getCompletedSubtasks = (subtasks: Subtask[])=>{
      let completed = 0

      for (const index in subtasks){
        const subtask = subtasks[index]

        if(subtask.completed) completed++
      }

      return completed
  }

  const [modalHidden, setModalHidden] = useState(true)

  const handleDragStart = (e: React.DragEvent, id: string) => {
    e.dataTransfer.setData("taskId", id)
  }

  return (
    <>
      <StyledTask draggable onDragStart={(e)=>{handleDragStart(e, task.id)}} key={task.id} onClick={()=>{setModalHidden(false)}}>
        <h2>{task.name}</h2>
        <p>{getCompletedSubtasks(task.subtasks)} of {task.subtasks.length} subtasks</p>
      </StyledTask>
      <Modal hidden={modalHidden} setHidden={setModalHidden} ><TaskForm setHidden={setModalHidden} mutate={mutate} task={task} columns={columns}></TaskForm></Modal>
    </>

  )
}

export default Task