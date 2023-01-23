import { mutate } from "swr"
import { ClientUpdate } from '../types/params'
import { v4 } from "uuid"
import { BoardAddType } from "../schemas/board_add"


export const createBoard = async (
  body: {name: string, columns: {name: string, id: string}[]}, 
  clientUpdate: ClientUpdate<{id: string, name:string}[]>) => {

   const boardId = v4()
   const fullColumns = body.columns.map((column)=>{
    const fullColumn = {...column, board_id: boardId}
    return fullColumn
   })
   const fullBody = {name: body.name, id: boardId, columns: fullColumns}

    if(clientUpdate.type==="state") {
      const newState = getOptimisticData(clientUpdate.currentState, {...body, id: boardId})
      clientUpdate.setState(newState)
      sendRequest(fullBody)
    } 
  
    if(clientUpdate.type==="mutate") {          
      const options = {
        optimisticData: (current:{name:string, id:string}[]) => getOptimisticData(current, {name: body.name, id: boardId} ),
        populateCache: false,
        revalidate: false
      }
      mutate(clientUpdate.mutateUrl, sendRequest(fullBody), options)
  
    }
  
  return
}

const sendRequest = async (body: BoardAddType ) => {
  const response = await fetch(`/api/boards/add`, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  })
}


const getOptimisticData = (currentState: {name: string, id: string}[], newBoard: {name: string, id:string} ) => {

  const newState = structuredClone(currentState)

  newState.push(newBoard)

  return newState
}