import { mutate } from "swr"

export const moveTask = async (taskId: string, columnId: string, mutateUrl?: string) => {
  
  const response = await fetch(`/api/tasks/${taskId}/move`, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({task_id: taskId, new_column_id: columnId})
  })

  if(mutateUrl)  await mutate(mutateUrl)

  return response
}