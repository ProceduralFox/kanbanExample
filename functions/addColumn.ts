import { mutate } from "swr"
import { ClientUpdate } from '../types/params'
import { FullBoard } from '../types/responses'
import { ColumnAddSchemaType } from "../schemas/column_add"

export const addColumn = async (
  body: ColumnAddSchemaType,
  clientUpdate: ClientUpdate<FullBoard>) => {

    if(clientUpdate.type==="state") {
      const newState = getOptimisticData(clientUpdate.currentState, body)
      clientUpdate.setState(newState)
      sendRequest(body)
    } 
  
    if(clientUpdate.type==="mutate") {          
      const options = {
        optimisticData: (current:FullBoard[]) => getOptimisticData(current[0], body),
        populateCache: false,
        revalidate: false
      }
      mutate(clientUpdate.mutateUrl, sendRequest({...body}), options)
    } 
  
  return
}

const sendRequest = async (body: ColumnAddSchemaType) => {
  const response = await fetch(`/api/columns/add`, {
    method: 'POST', 
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body) 
  })
}

const getOptimisticData = (currentData: FullBoard, body: ColumnAddSchemaType) => {

  const newData = structuredClone(currentData)

  newData.columns.push({...body, tasks: []})

  return [newData]
}