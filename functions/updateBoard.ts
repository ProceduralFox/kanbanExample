import { z } from "zod"
import { boardUpdateSchema } from "../schemas/board_update"
import { mutate } from "swr"


export const updateBoard = async (board:z.infer<typeof boardUpdateSchema>, mutateUrl?: string) => {
  // TODO: move all these to separate files, add row level policy for adding columns only to own boards
  
  const response = await fetch(`/api/boards/${board.id}/update`, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(board)
  })

  if(mutateUrl) await mutate(mutateUrl)

  return response
}