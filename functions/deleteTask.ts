import { mutate } from "swr"
import { ClientUpdate } from '../types/params'
import { FullBoard } from "../types/responses"

export const deleteTask = async (
  taskId: string, 
  clientUpdate: ClientUpdate<FullBoard>) => {

    if(clientUpdate.type==="state") {
      // const newState = getOptimisticData(clientUpdate.currentState, newColumnId, taskId)
      // clientUpdate.setState(newState)
      // sendRequest(taskId, newColumnId)
    } 
  
    if(clientUpdate.type==="mutate") {          
      const options = {
        optimisticData: (current:FullBoard[]) => getOptimisticData(current[0], taskId ),
        populateCache: false,
        revalidate: false
      }
      mutate(clientUpdate.mutateUrl, sendRequest(taskId), options)
  
    } 

}

const sendRequest = async (taskId: string)=>{
  const response = await fetch(`/api/tasks/${taskId}/delete`, {
    method: 'DELETE',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
  })
}

const getOptimisticData = (currentState: FullBoard, taskId: string)=>{
  // const newState = structuredClone(currentState)
  let taskCoordinates = [0,0]

  const newState = {...currentState, columns: currentState.columns.map((column, columnIndex)=>{
    return {
      ...column,
      tasks: column.tasks.map((task, taskIndex)=>{
        if(task.id===taskId) taskCoordinates = [columnIndex, taskIndex]

        return {
          ...task,
          subtasks: task.subtasks.map((subtask)=>{
            return {...subtask}
          })
        }
      })
    }
  }) }

  
  newState.columns[taskCoordinates[0]].tasks.splice(taskCoordinates[1], 1)

  return [newState]

}