import { useSession } from '@supabase/auth-helpers-react'
import React from 'react'
import useSWR from 'swr'
import { fetcher } from '../../swr/config'
import Link from 'next/link'

type Props = {}


const Sidebar = (props: Props) => {
  const session = useSession()

  const {data, error} = useSWR('/api/boards', fetcher)

  if(!data) return <div>loading</div>

  // console.log(data, "board in browser")
  // console.log(session)
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