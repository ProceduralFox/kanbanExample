import React, { useContext, useState, useEffect } from 'react'
import { FullBoard } from '../../types/entities'
import { StyledBoard, StyledBoardAddColumn, StyledBoardColumn, StyledBoardColumnTitle, StyledBoardNoColumns } from './styles'
import { moveTask } from '../../functions/moveTask'
import { addColumn } from '../../functions/addColumn'
import Task from '../task/task'
import Modal from '../modal/modal'
import AddColumnForm from '../forms/add_column_form'
import { DarkModeContext } from '../../context/darkmode_context'
import useSWRMutation from 'swr/mutation'
import { H1, H2 } from '../../styles/typography'
import { StyledButtonPrimary } from '../../styles/buttons'



type Props = {
  boardInfo: FullBoard
  boardId: string
  
}
const BoardView = (props: Props) => {
  const { boardInfo, boardId } = props

  const { darkMode } = useContext(DarkModeContext)
  // const { trigger, isMutating } = useSWRMutation(`/api/boards/${props.boardId}/`, sendRequest )

  const [ modalHidden, setModalHidden ] = useState(true)
  const [boardState, setBoardState] = useState(boardInfo)


  const handleDragOver = (e: React.DragEvent) => {
    e.stopPropagation();
    e.preventDefault();
  }

  const handleDrop = (e: React.DragEvent, columnId: string)=>{
    e.preventDefault()
    const taskId = e.dataTransfer.getData("taskId")

    moveTask(taskId, columnId, { type:"mutate", mutateUrl: `/api/boards/${props.boardId}/`, currentState: boardInfo})
  }

  const columnsSimplified = boardInfo.columns.map((col)=>{return {name: col.name, id: col.id}})



  return (
    <StyledBoard darkMode={darkMode}>
        {
          boardInfo.columns.length===0?
          <>
          {
            <StyledBoardNoColumns>
              <H2 darkMode={darkMode}>This board is empty. Create a new column to get started.</H2>
              <StyledButtonPrimary onClick={(e)=>{setModalHidden(false)}}>+ Add New Column</StyledButtonPrimary>
            </StyledBoardNoColumns>
          }
          </>
          :
          <>
          {
            boardInfo.columns.map((column, index)=>{
              return (
                <StyledBoardColumn 
                  onDragOver={(e)=>handleDragOver(e)}
                  onDrop={(e)=>handleDrop(e, column.id)}
                  key={index}
                  >
                    <StyledBoardColumnTitle isEven={index%2} darkMode={false}>{column.name}</StyledBoardColumnTitle>
                    <ul>
                      {
                        column.tasks.map((task, index)=>{
                          return <Task key={task.id} task={task} columns={columnsSimplified}></Task>
                        })
                      }
                    </ul>
                </StyledBoardColumn>
              )
            })
          } 
          <StyledBoardAddColumn darkMode={darkMode} onClick={(e)=>{setModalHidden(false)}}><H1 darkMode={darkMode}>+ New Column</H1></StyledBoardAddColumn>
          </>
        }

        <Modal hidden={modalHidden} setHidden={setModalHidden}><AddColumnForm setHidden={setModalHidden} boardId={boardId}></AddColumnForm></Modal>
    </StyledBoard>
  )
}



export default BoardView