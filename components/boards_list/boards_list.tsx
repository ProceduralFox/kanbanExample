import React, { useContext, useState } from 'react'
import { StyledSidebarBoard, StyledSidebarTitle } from '../sidebar/styles'
import { StyledBoardsList } from './styles'
import Image from 'next/image'
import Link from 'next/link'
import { H3 } from '../../styles/typography'
import { DarkModeContext } from '../../context/darkmode_context'
import { useRouter } from 'next/router'
import Modal from '../modal/modal'
import AddBoardForm from '../forms/add_board_form'
import { fetcher } from '../../swr/config'
import useSWR from 'swr'
import truncateString from '../../functions/truncate_string'


type Props = {
  initialBoards: {id:string, name:string}[]
}


const BoardsList = (props: Props) => {
  const { darkMode } = useContext(DarkModeContext)

  const router = useRouter()

  const [modalHidden, setModalHidden] = useState(true)

  const {data: boards, mutate} = useSWR<{id: string, name:string}[]>('/api/boards/', fetcher, {
    fallbackData: props.initialBoards
  })

  if(!boards) return null


  const getTruncatedTitle = (maxLen: number, board: {name: string, id:string}) => {
    if (board.name.length<maxLen) return <H3 darkMode={darkMode}>{board.name}</H3>
    
    return <H3 darkMode={darkMode} title={board.name}>{truncateString(board.name, maxLen, "...")}</H3>
  }

  
  
  return (
    <>
    <StyledSidebarTitle darkMode={darkMode}>All Boards ({boards!.length})</StyledSidebarTitle>
    <StyledBoardsList>
      {boards!.map((board)=>{
        return (<StyledSidebarBoard key={board.id} selected={board.id===router.query.board_id}>
            <Image src={"/board_icon.svg"} alt="board icon" width={16} height={16}></Image>
            <Link scroll={false} href={`/board/${board.id}`} key={board.id}>{getTruncatedTitle(20, board)}</Link>
          </StyledSidebarBoard>)
      })}
      <StyledSidebarBoard create> 
              <Image src={"/board_icon.svg"} alt="board icon" width={16} height={16}></Image>
              <button onClick={()=>{setModalHidden(false)}}><H3 darkMode={darkMode}>+ Create New Board</H3></button>
      </StyledSidebarBoard>
    </StyledBoardsList>
    <Modal hidden={modalHidden} setHidden={setModalHidden} ><AddBoardForm setHidden={setModalHidden}></AddBoardForm></Modal>
    </>
  )
}

export default BoardsList