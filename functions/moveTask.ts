export const moveTask = async (taskId: string, columnId: string, mutate: Function) => {
  console.log(taskId, columnId)
  const response = await fetch(`/api/tasks/${taskId}/move`, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    // mode: 'cors', // no-cors, *cors, same-origin
    // cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json'
    },
    // redirect: 'follow', // manual, *follow, error
    // referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify({task_id: taskId, new_column_id: columnId}) // body data type must match "Content-Type" header
  })
  
  return await mutate()
}