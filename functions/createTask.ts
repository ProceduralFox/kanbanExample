import z from 'zod'
import { taskAddSchema } from '../schemas/task_add'
import { mutate } from 'swr'
import { ClientUpdate } from '../types/params'


export const createTask = async (
  body: z.infer<typeof taskAddSchema>, 
  clientUpdate: ClientUpdate
  ) => {

    if(clientUpdate.type==="state"){
      //
      
    }

  const response = fetch(`/api/tasks/add`, {
    method: 'POST',
    credentials: 'same-origin', 
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  })
  
  if(clientUpdate.type==="mutate") {
    await mutate(async ()=>{
      await response
      return clientUpdate.mutateUrl
    }, {})
  }
  
  return response
}