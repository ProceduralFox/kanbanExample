import { mutate } from "swr"
import { ClientUpdate } from '../types/params'


export const moveTask = async (
  taskId: string, 
  columnId: string, 
  clientUpdate: ClientUpdate
  ) => {

  if(clientUpdate.type==="state"){

  }
  
  const response = await fetch(`/api/tasks/${taskId}/move`, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({task_id: taskId, new_column_id: columnId})
  })



  return response
}