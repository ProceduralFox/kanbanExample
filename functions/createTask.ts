import z from 'zod'
import { taskAddSchema } from '../schemas/task_add'
import { mutate } from 'swr'
import { ClientUpdate } from '../types/params'
import { FullBoard, Task } from '../types/responses'
import { v4 } from 'uuid';
import { taskUpdateSchema } from '../schemas/task_update'


export const createTask = async (
  body: z.infer<typeof taskUpdateSchema>, 
  clientUpdate: ClientUpdate<FullBoard>
  ) => {

    if(clientUpdate.type==="state") {
      const newState = getOptimisticData(clientUpdate.currentState, body)
      clientUpdate.setState(newState)
      sendRequest(body)
    } 
  
    if(clientUpdate.type==="mutate") {          
      const options = {
        optimisticData: (current:FullBoard[]) => getOptimisticData(current[0], body ),
        populateCache: false,
        revalidate: false
      }
      mutate(clientUpdate.mutateUrl, sendRequest(body), options)
  
    } 
}


const sendRequest = async (body: z.infer<typeof taskUpdateSchema> ) => {
  const response = await fetch(`/api/tasks/add`, {
    method: 'POST',
    credentials: 'same-origin', 
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  })
}



const getOptimisticData = (currentData: FullBoard, newTask: z.infer<typeof taskUpdateSchema>) => {
  const newState = structuredClone(currentData)
  const task = {...newTask.task, subtasks: newTask.subtasks??[]}

  newState.columns.forEach((column)=>{
    if(column.id===task.column_id){
      column.tasks.push({...task, subtasks: task.subtasks.filter(subtask=>!subtask.toDelete)})
    }
  })

  return [newState]

}