import React, { useContext, useState } from 'react'
import { FullBoard } from '../../types/responses'
import { StyledBoard, StyledBoardColumn, StyledBoardColumnTitle } from './styles'
import { moveTask } from '../../functions/moveTask'
import { addColumn } from '../../functions/addColumn'
import Task from '../task/task'
import Modal from '../modal/modal'
import AddColumnForm from '../forms/add_column_form'
import { DarkModeContext } from '../../context/darkmode_context'

type Props = {
  boardInfo: FullBoard
  boardId: string
  
}



const BoardView = (props: Props) => {
  const { boardInfo, boardId } = props

  const { darkMode } = useContext(DarkModeContext)

  const [ modalHidden, setModalHidden ] = useState(true)


  const handleDragOver = (e: React.DragEvent) => {
    e.stopPropagation();
    e.preventDefault();
  }

  const handleDrop = (e: React.DragEvent, columnId: string)=>{
    e.preventDefault()
    const taskId = e.dataTransfer.getData("taskId")

    moveTask(taskId, columnId, `/api/boards/${boardInfo.id}/`)
  }

  const columnsSimplified = boardInfo.columns.map((col)=>{return {name: col.name, id: col.id}})
  
  return (
    <StyledBoard darkMode={darkMode}>
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
                      column.tasks.map((task)=>{
                        return <Task key={task.id} task={task} columns={columnsSimplified}></Task>
                      })
                    }
                  </ul>
              </StyledBoardColumn>
            )
          })
        }
        <StyledBoardColumn center={true} onClick={(e)=>{setModalHidden(false)}}>+ Add Column</StyledBoardColumn>
        <Modal hidden={modalHidden} setHidden={setModalHidden}><AddColumnForm setHidden={setModalHidden} boardId={boardId}></AddColumnForm></Modal>
    </StyledBoard>
  )
}



export default BoardView