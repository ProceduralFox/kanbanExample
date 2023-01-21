import { mutate } from "swr"


export const createBoard = async (body: {name: string, columns: string[]}, mutateUrl?: string) => {
  const response = await fetch(`/api/boards/add`, {
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