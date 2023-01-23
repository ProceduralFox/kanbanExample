import { useRouter } from 'next/router'
import React, { useContext, useEffect, useState } from 'react'
import useSWR from 'swr'
import { fetcher } from '../../swr/config'
import { moveTask } from '../../functions/moveTask'
import { addColumn } from '../../functions/addColumn'
import { FullBoard } from '../../types/responses'
import BoardView from '../../components/board/board'
import { StyledLayout } from '../../components/layout/styles'
import Sidebar from '../../components/sidebar/sidebar_component'
import TopBar from '../../components/top_bar/top_bar'
import Image from 'next/image'
import { H1 } from '../../styles/typography'
import { DarkModeContext } from '../../context/darkmode_context'
import LogoBar from '../../components/logo_bar/logo_bar'
import { useWindowSize } from '../../hooks/useWindowSize'
import { createServerSupabaseClient,  } from '@supabase/auth-helpers-nextjs'
import { Database } from '../../types/supabase'

type Props = {
  serverBoards: {id: string, name:string}[]
  serverFullBoard: FullBoard[]
}


const BoardDetail = (props: Props) => {

  const router = useRouter();
  const { serverBoards, serverFullBoard} = props

  const { board_id } = router.query;

  const size = useWindowSize();

  const {darkMode} = useContext(DarkModeContext)

  const {data: boardInfo, error, mutate} = useSWR<FullBoard[]>(`/api/boards/${board_id}/`, fetcher, {
    fallbackData: serverFullBoard
  } )

  // if(!boardInfo) return <H1 darkMode={darkMode}>Error occured</H1>
  if(typeof board_id !== "string") return  // technically safer than type assertion right?
  // TODO: row level policy for ALL tables as well

  console.log(boardInfo, "#############################")

  const columnsSimplified = boardInfo![0].columns.map((col)=>{return {name: col.name, id: col.id}})

  if(size.width && size.width<600 ){
    return <>
    <div style={{background: "hotpink", width: "100%", height: "10%", display: "flex"}}>
      <TopBar initialBoards={serverBoards} board={boardInfo![0]} columns={columnsSimplified}></TopBar>
    </div>
    <div style={{display: "flex", height: "90%", width: "100%"}}>
      <BoardView boardInfo={boardInfo![0]} boardId={board_id}></BoardView>
    </div>
  </>
  }
  
  return (
  <StyledLayout darkMode={darkMode}>
    <div style={{background: "hotpink", width: "100%", height: "10%", display: "flex"}}>
      <LogoBar></LogoBar>
      <TopBar initialBoards={serverBoards} board={boardInfo![0]} columns={columnsSimplified}></TopBar>
    </div>
    <div style={{display: "flex", height: "90%", width: "100%"}}>
      <Sidebar initialBoards={serverBoards}></Sidebar>
      <BoardView boardInfo={boardInfo![0]} boardId={board_id}></BoardView>
    </div>
  </StyledLayout>
  )
}

export async function getServerSideProps( context:any ) {
  const { req, res, params } = context

  const supabase = createServerSupabaseClient<Database>({ req, res })
  
  let { data: allBoards, error: boardsError } = await supabase
  .from('boards')
  .select('name, id')

  let { data: fullBoard, error: fullBoardError } = await supabase
  .from('boards')
  .select('*, columns:board_columns(*,tasks:tasks(*, subtasks:subtasks(*)))')
  .eq('id', params.board_id)


  return { props: { serverBoards: allBoards, serverFullBoard: fullBoard } }
}

export default BoardDetail