import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import useSWR from 'swr'
import { fetcher } from '../../swr/config'

type Props = {}

const BoardDetail = (props: Props) => {

  const router = useRouter();

  const { board_id } = router.query;

  const {data: boardInfo, error, mutate} = useSWR(`/api/boards/${board_id}/`, fetcher)

  if(!boardInfo) return <div>loading</div>
  // TODO: row level policy for ALL tables as well

  console.log(boardInfo, "all board info here")

  const addColumns = async () => {
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
      body: JSON.stringify({name: "new column", board_id: board_id}) // body data type must match "Content-Type" header
    })

    return await mutate()
  }

  const moveTask = async (taskId: string, columnId: string) => {
    console.log(taskId, columnId)
    const response = await fetch(`/api/tasks/move`, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      // mode: 'cors', // no-cors, *cors, same-origin
      // cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json'
      },
      // redirect: 'follow', // manual, *follow, error
      // referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify({id: taskId, column_id: columnId}) // body data type must match "Content-Type" header
    })

    console.log(response)
    
    return await mutate()
  }

  return (
      <div>
        <h1>Board Detail for {boardInfo[0].name},</h1>
        <div>
          {
            boardInfo[0].columns.map((column:any, index:any)=>{
              return (<div key={column.id}>
                <h2 onClick={()=>{moveTask("5d944d54-e539-42a0-aa8a-5795d74706a6", column.id)}}>{column.name}</h2>
                <div>
                  {
                    column.tasks.map((task:any, index: any)=>{
                      return (
                        <div>{task.name}</div>
                      )
                    })
                  }
                </div>
              </div>)
            })
          }
          <br />
          <div>
            <button onClick={()=>{console.log(addColumns())}}>Add new column</button>
          </div>
        </div>
      </div>
  )
}

export default BoardDetail