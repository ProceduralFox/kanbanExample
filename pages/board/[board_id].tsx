import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import useSWR from 'swr'
import { fetcher } from '../../swr/config'
import { moveTask } from '../../functions/moveTask'
import { addColumn } from '../../functions/addColumn'
import { FullBoard } from '../../types/responses'
import BoardView from '../../components/board/board'
import { StyledLayout } from '../../components/layout/styles'
import Sidebar from '../../components/sidebar/sidebar_component'
import TopBar from '../../components/topbar/top_bar'


type Props = {}


const BoardDetail = (props: Props) => {

  const router = useRouter();

  const { board_id } = router.query;


  const {data: boardInfo, error, mutate} = useSWR<FullBoard[]>(`/api/boards/${board_id}/`, fetcher)

  if(!boardInfo) return <div>loading</div>
  if(typeof board_id !== "string") return null // technically safer than type assertion right?
  // TODO: row level policy for ALL tables as well



  console.log(boardInfo[0])

  const columnsSimplified = boardInfo[0].columns.map((col)=>{return {name: col.name, id: col.id}})

  return (
    <StyledLayout>
    <div style={{background: "hotpink", width: "100%", height: "10%", display: "flex"}}>
      <div style={{background: "lightblue", width: "20%"}}>Kanban + logo</div>
      <TopBar board={{id:boardInfo[0].id, title: boardInfo[0].name}} mutate={mutate} columns={columnsSimplified}></TopBar>
    </div>
    <div style={{display: "flex", height: "90%"}}>
      <Sidebar></Sidebar>
      <div style={{width: "80%", overflow: "auto"}}>
        <BoardView boardInfo={boardInfo[0]} boardId={board_id} mutate={mutate}></BoardView>
      </div>
    </div>
  </StyledLayout>
  )
}

export default BoardDetail