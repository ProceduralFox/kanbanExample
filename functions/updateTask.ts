import z from 'zod'
import { taskUpdateSchema } from '../schemas/task_update'
import { mutate } from 'swr'

export const updateTask = async (body: z.infer<typeof taskUpdateSchema>, mutateUrl?: string) => {
  const response = await fetch(`/api/tasks/${body.task.id}/update`, {
    method: 'POST',
    credentials: 'same-origin', 
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  })
  
  if(mutateUrl) mutate(mutateUrl)

  return response
}