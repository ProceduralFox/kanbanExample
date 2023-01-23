import { z } from "zod"
import { boardUpdateSchema, BoardUpdateType } from "../schemas/board_update"
import { mutate } from "swr"
import { ClientUpdate } from "../types/params"
import { FullBoard, Column  } from "../types/responses"
import { v4 } from "uuid"

export const updateBoard = async (
  board:BoardUpdateType, 
  clientUpdate: ClientUpdate<FullBoard>) => {

  if(clientUpdate.type==="state") {
    const newState = getOptimisticData(clientUpdate.currentState, board)
    clientUpdate.setState(newState)
    sendRequest(board)
  } 

  if(clientUpdate.type==="mutate") {          
    const options = {
      optimisticData: (current:FullBoard[]) => getOptimisticData(current[0], board),
      populateCache: false,
      revalidate: false
    }
    mutate(clientUpdate.mutateUrl, sendRequest({...board}), options)
  } 

  return
}

const sendRequest = async (board: BoardUpdateType)=>{
  const response = await fetch(`/api/boards/${board.id}/update`, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(board)
  })
}

const getOptimisticData = (currentState: FullBoard, updatedBoard: BoardUpdateType) => {
  const newState = structuredClone(currentState);

  newState.name = updatedBoard.name

  const toDeleteColumns = new Set<string>([])
  
  const isFresh = currentState.columns.length === 0
  const freshColumns: Column[] = []

  updatedBoard.columns.forEach((column)=>{
    if(column.toDelete) {
      toDeleteColumns.add(column.id)
      return 
    }
    if(isFresh){
      freshColumns.push({
        id: column.id,
        board_id: column.board_id,
        name: column.name,
        tasks: []
      })
    }
  })


  const newColumns = newState.columns.filter(column=>!toDeleteColumns.has(column.id))

  newState.columns = isFresh ? freshColumns : newColumns

  return [newState]

}