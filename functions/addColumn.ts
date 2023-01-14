export const addColumn = async (board_id: string, name: string, mutate: Function) => {
  // TODO: move all these to separate files, add row level policy for adding columns only to own boards
  const response = await fetch(`/api/columns/add`, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    // mode: 'cors', // no-cors, *cors, same-origin
    // cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json'
    },
    // redirect: 'follow', // manual, *follow, error
    // referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify({name: name, board_id: board_id}) // body data type must match "Content-Type" header
  })

  return await mutate()
}