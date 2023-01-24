import z from 'zod'
import { taskUpdateSchema, TaskUpdateType } from '../schemas/task_update'
import { mutate } from 'swr'
import { ClientUpdate } from '../types/params'
import { FullBoard, Task } from '../types/entities'

export const updateTask = async (
  body: TaskUpdateType, 
  clientUpdate: ClientUpdate<FullBoard>) => {

    if(clientUpdate.type==="state") {
      const newState = getOptimisticData(clientUpdate.currentState, body)
      clientUpdate.setState(newState)
      sendRequest(body)
    } 
  
    if(clientUpdate.type==="mutate") {          
      const options = {
        optimisticData: (current:FullBoard[]) => getOptimisticData(current[0], body),
        populateCache: false,
        revalidate: false
      }
      mutate(clientUpdate.mutateUrl, sendRequest(body), options)
  
    } 
}

const sendRequest = async (body: TaskUpdateType) => {
  const response = await fetch(`/api/tasks/${body.task.id}/update`, {
    method: 'POST',
    credentials: 'same-origin', 
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  })
}

const getOptimisticData = (currentState: FullBoard, updatedTask: TaskUpdateType) => {  
  const newState = structuredClone(currentState)
  const newTask: Task = {...updatedTask.task, subtasks: []}
  
  updatedTask.subtasks.forEach((subtask)=>{
    if(!(subtask.toDelete)) newTask.subtasks.push({id: subtask.id, name: subtask.name, task_id: subtask.task_id, completed: subtask.completed})
  })


  let newColumnIndex = 0
  let oldColumnIndex = 0
  let oldTaskIndex = 0


  for (let columnIndex = 0; columnIndex < newState.columns.length; columnIndex++) {
    const column = newState.columns[columnIndex];

    if(column.id===newTask.column_id) newColumnIndex = columnIndex

    for (let taskIndex = 0; taskIndex < column.tasks.length; taskIndex++) {
      const task = column.tasks[taskIndex];
      
      if(newTask.id===task.id){
        oldTaskIndex = taskIndex
        oldColumnIndex = columnIndex
      }
    }
  }


  newState.columns[oldColumnIndex].tasks.splice(oldTaskIndex,1)[0]

  newState.columns[newColumnIndex].tasks.push(newTask)

  return [newState]
  
}
