import { useSession } from '@supabase/auth-helpers-react'
import React from 'react'
import useSWR from 'swr'
import { fetcher } from '../../swr/config'

type Props = {}

const Sidebar = (props: Props) => {
  const session = useSession()

  const {data, error} = useSWR('api/boards', fetcher)

  if(!data) return <div>loading</div>

  console.log(data, "data in browser")
  console.log(session)
  return (
    <div>
      <div>
        {data.map((board:any)=>{
          return (<div>{board.name}</div>)
        })}
      </div>
    </div>
  )
}

export default Sidebar