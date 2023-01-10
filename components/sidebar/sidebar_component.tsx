import { useSession } from '@supabase/auth-helpers-react'
import React from 'react'
import useSWR from 'swr'
import { fetcher } from '../../swr/config'
import Link from 'next/link'
import { Boards } from '../../types/responses'

type Props = {}


const Sidebar = (props: Props) => {
  const session = useSession()

  const {data, error} = useSWR<Boards>('/api/boards', fetcher)

  if(!data) return <div>loading</div>

  // console.log(data, "board in browser")
  // console.log(session)

  console.log("all boards are", data)
  return (
    <div>
      <div>
        {data.map((board:any)=>{
          return (<Link href={`/board/${board.id}`} key={board.id}>{board.name}</Link>)
        })}
      </div>
    </div>
  )
}

export default Sidebar