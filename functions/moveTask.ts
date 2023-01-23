import { mutate } from "swr"
import { ClientUpdate } from '../types/params'
import { FullBoard } from "../types/responses"


export const moveTask = async (
  taskId: string, 
  newColumnId: string, 
  clientUpdate: ClientUpdate<FullBoard>
  ) => {


  if(clientUpdate.type==="state") {
    const newState = getOptimisticData(clientUpdate.currentState, newColumnId, taskId)
    clientUpdate.setState(newState)
    sendRequest(taskId, newColumnId)
  } 

  if(clientUpdate.type==="mutate") {          
    const options = {
      optimisticData: (current:FullBoard[]) => getOptimisticData(current[0], newColumnId, taskId ),
      populateCache: false,
      revalidate: false
    }
    mutate(clientUpdate.mutateUrl, sendRequest(taskId, newColumnId), options)

  } 
}

const sendRequest = async (taskId: string, newColumnId: string ) => {

  const response = await fetch(`/api/tasks/${taskId}/move`, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({task_id: taskId, new_column_id: newColumnId})
  })

  return response
}

const getOptimisticData = (currentState: FullBoard, newColumnId: string, taskId: string) => {
  const newState = structuredClone(currentState); 
  // const newState = currentState
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

  newState.columns[newColumnIndex].tasks.push(movedTask)


  return [newState]
}