import { useSession } from '@supabase/auth-helpers-react'
import React, { useContext, useState } from 'react'
import useSWR from 'swr'
import { fetcher } from '../../swr/config'
import Link from 'next/link'
import { FullBoard } from '../../types/responses'
import { StyledSidebar, StyledSidebarBoard, StyledSidebarBoardsWrapper } from './styles'
import Image from 'next/image'
import { H3 } from '../../styles/typography'
import { DarkModeContext } from '../../context/darkmode_context'
import { useRouter } from 'next/router'
import Modal from '../modal/modal'
import AddBoardForm from '../form/add_board_form'

type Props = {}



const Sidebar = (props: Props) => {
  const session = useSession()
  const { darkMode } = useContext(DarkModeContext)
  const router = useRouter()

  console.log(router.query)

  const [hidden, setHidden] = useState(false)
  const [modalHidden, setModalHidden] = useState(true);

  const {data, error, mutate} = useSWR<FullBoard[]>('/api/boards', fetcher)

  if(!data) return <div>loading</div>

  // console.log(data, "board in browser")
  // console.log(session)

  if(hidden){
    return <button onClick={()=>{setHidden(!hidden)}}>??????</button>
  }

  
  console.log("all boards are", data)
  return (
    <>
      <StyledSidebar darkMode={darkMode}>
        <div style={{ width: "100%"}}>
          <h2>All Boards ({data.length})</h2>
          <ul>
            {data.map((board)=>{
              return (<StyledSidebarBoard selected={board.id===router.query.board_id}>
                  <Image src={"/board_icon.svg"} alt="board icon" width={16} height={16}></Image>
                  <Link href={`/board/${board.id}`} key={board.id}><H3 darkMode={darkMode}>{board.name}</H3></Link>
                </StyledSidebarBoard>)
            })}
            <StyledSidebarBoard create> 
                    <Image src={"/board_icon.svg"} alt="board icon" width={16} height={16}></Image>
                    <button onClick={()=>{setModalHidden(false)}}><H3 darkMode={darkMode}>Create New Board</H3></button>
            </StyledSidebarBoard>
          </ul>
        </div>
        <div>
          <div>Dark/Light Mode button</div>
          <button onClick={()=>{setHidden(!hidden)}}>Hide button</button>
        </div>
      </StyledSidebar>
      <Modal hidden={modalHidden} setHidden={setModalHidden} ><AddBoardForm setHidden={setModalHidden} mutate={mutate}></AddBoardForm></Modal>
    </>
  )
}

export default Sidebar