import z from 'zod'
import { taskAddSchema } from '../schemas/task_add'



export const createTask = async (body: z.infer<typeof taskAddSchema>, mutate: Function) => {
  const response = await fetch(`/api/tasks/add`, {
    method: 'POST',
    credentials: 'same-origin', 
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  })
  
  return await mutate()
}