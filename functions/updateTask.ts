import z from 'zod'
import { taskUpdateSchema } from '../schemas/task_update'



export const updateTask = async (body: z.infer<typeof taskUpdateSchema>, mutate: Function) => {
  const response = await fetch(`/api/tasks/${body.task.id}/update`, {
    method: 'POST',
    credentials: 'same-origin', 
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  })
  
  return await mutate()
}