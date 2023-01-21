import { mutate } from "swr"


export const deleteTask = async (taskId: string, mutateUrl?: string) => {

  const response = await fetch(`/api/tasks/${taskId}/delete`, {
    method: 'DELETE',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
  })

  if(mutateUrl) await mutate(mutateUrl)

  return response
}