import z from 'zod'
import { taskAddSchema } from '../schemas/task_add'
import { mutate } from 'swr'


export const createTask = async (body: z.infer<typeof taskAddSchema>, mutateUrl?: string) => {
  const response = await fetch(`/api/tasks/add`, {
    method: 'POST',
    credentials: 'same-origin', 
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  })
  
  if(mutateUrl) await mutate(mutateUrl)
  
  return response
}