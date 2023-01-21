import { mutate } from "swr"
import { z } from "zod"


export const deleteBoard = async (boardId: string, mutateUrl?: string) => {

  const response = await fetch(`/api/boards/${boardId}/delete`, {
    method: 'DELETE',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
  })

  if(mutateUrl) await mutate(mutateUrl)

  return response
}