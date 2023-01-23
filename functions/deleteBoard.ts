import { mutate } from "swr"
import { z } from "zod"
import { ClientUpdate } from "../types/params"


export const deleteBoard = async (
  boardId: string,
  clientUpdate: ClientUpdate<{name:string, id:string}[]>) => {


  if(clientUpdate.type==="state") {
    const newState = getOptimisticData(clientUpdate.currentState, boardId)
    clientUpdate.setState(newState)
    sendRequest(boardId)
  } 

  if(clientUpdate.type==="mutate") {          
    const options = {
      optimisticData: (current:{name:string, id:string}[]) => getOptimisticData(current, boardId ),
      populateCache: false,
      revalidate: true
    }
    mutate(clientUpdate.mutateUrl, sendRequest(boardId), options)

  }


}

const sendRequest = async (boardId: string) => {
  const response = await fetch(`/api/boards/${boardId}/delete`, {
    method: 'DELETE',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
  })

}

const getOptimisticData = (currentState: {name:string, id: string}[], boardId: string) => {
  const newState = currentState.filter((board)=>!(board.id===boardId))

  return newState
}