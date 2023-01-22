import { mutate } from "swr"
import { ClientUpdate } from '../types/params'
import { FullBoard } from "../types/responses"


export const moveTask = async (
  taskId: string, 
  newColumnId: string, 
  clientUpdate: ClientUpdate<FullBoard>
  ) => {
  const newState = getOptimisticData(clientUpdate.currentState, newColumnId, taskId)

  if(clientUpdate.type==="state") clientUpdate.setState(newState)

  const response = await fetch(`/api/tasks/${taskId}/move`, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({task_id: taskId, new_column_id: newColumnId})
  })

  if(clientUpdate.type==="mutate") {          
    const options = {
      optimisticData: [newState]
    }
    mutate(clientUpdate.mutateUrl, [newState], options)
  } 

  return response
}


export const sendRequest = async (taskId: string, newColumnId: string) => {
  const response = await fetch(`/api/tasks/${taskId}/move`, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({task_id: taskId, new_column_id: newColumnId})
  })
}

const getOptimisticData = (currentState: FullBoard, newColumnId: string, taskId: string) => {
  const newState = structuredClone(currentState);

  let newColumnIndex = 0
  let oldColumnIndex = 0
  let oldTaskIndex = 0

  // I think that for making this faster in an algo way I would need to change the structure of the data
  // which I think is not really worth it given that the sizes of these entities will never be such that the
  // complexity will matter from a performance standpoint

  for (let columnIndex = 0; columnIndex < newState.columns.length; columnIndex++) {
    const column = newState.columns[columnIndex];

    if(column.id===newColumnId) newColumnIndex = columnIndex

    for (let taskIndex = 0; taskIndex < column.tasks.length; taskIndex++) {
      const task = column.tasks[taskIndex];
      
      if(taskId===task.id){
        task.column_id = newColumnId
        oldTaskIndex = taskIndex
        oldColumnIndex = columnIndex
      }
    }
  }

  const movedTask = newState.columns[oldColumnIndex].tasks.splice(oldTaskIndex,1)[0]
  console.log(movedTask, "moved task is undefined?")
  newState.columns[newColumnIndex].tasks.push(movedTask)
  console.log(newState)

  return newState
}