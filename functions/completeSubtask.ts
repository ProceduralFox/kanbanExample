import { z } from "zod"
import { subtaskCompleteSchema } from "../schemas/subtask_complete"
import { mutate } from "swr"


export const completeSubtask = async (subtask_id: string, body: z.infer<typeof subtaskCompleteSchema>, mutateUrl?: string ) => {
  // TODO: move all these to separate files, add row level policy for adding columns only to own boards
  const response = await fetch(`/api/subtasks/${subtask_id}/complete`, {
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