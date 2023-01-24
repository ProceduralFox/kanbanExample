import { z } from "zod"
import { mutate } from "swr"
import { ClientUpdate } from '../types/params'
import { Subtask } from '../types/entities'

export const completeSubtask = async (
  subtask_id: string, 
  completed: boolean,
  clientUpdate: ClientUpdate<boolean> ) => {

    if(clientUpdate.type==="state") {
      const newState = !clientUpdate.currentState
      clientUpdate.setState(newState)
      sendRequest(subtask_id, completed)
    } 
  
    if(clientUpdate.type==="mutate") {
    } 
}


const sendRequest = async (subtask_id: string, completed:boolean)=>{
  const response = await fetch(`/api/subtasks/${subtask_id}/complete`, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({completed:completed})
  })
}
