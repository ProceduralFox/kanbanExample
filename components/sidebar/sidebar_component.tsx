import { useSession } from '@supabase/auth-helpers-react'
import React, { useState } from 'react'
import useSWR from 'swr'
import { fetcher } from '../../swr/config'
import Link from 'next/link'
import { FullBoard } from '../../types/responses'
import { StyledSidebar } from './styles'

type Props = {}


const Sidebar = (props: Props) => {
  const session = useSession()

  const [hidden, setHidden] = useState(false)

  const {data, error} = useSWR<FullBoard[]>('/api/boards', fetcher)

  if(!data) return <div>loading</div>

  // console.log(data, "board in browser")
  // console.log(session)

  if(hidden){
    return <button onClick={()=>{setHidden(!hidden)}}>??????</button>
  }

  console.log("all boards are", data)
  return (
    <StyledSidebar>
      <div>
        <h2>All Boards ({data.length})</h2>
        <ul>
          {data.map((board:any)=>{
            return (<li><Link href={`/board/${board.id}`} key={board.id}>{board.name}</Link></li>)
          })}
        </ul>
        <button>+ Create New Board</button>
      </div>
      <div>
        <div>Dark/Light Mode button</div>
        <button onClick={()=>{setHidden(!hidden)}}>Hide button</button>
      </div>
    </StyledSidebar>
  )
}

export default Sidebar