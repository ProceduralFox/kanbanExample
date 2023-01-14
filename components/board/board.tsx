import React from 'react'
import { FullBoard } from '../../types/responses'
import { StyledBoard, StyledBoardColumn } from './styles'
import { moveTask } from '../../functions/moveTask'
import { addColumn } from '../../functions/addColumn'
import Task from '../task/task'

type Props = {
  boardInfo: FullBoard
  boardId: string
  mutate: Function
}

const BoardView = (props: Props) => {
  const { boardInfo, mutate, boardId } = props

  const handleDragOver = (e: React.DragEvent) => {
    e.stopPropagation();
    e.preventDefault();
  }

  const handleDrop = (e: React.DragEvent, columnId: string)=>{
    e.preventDefault()
    const taskId = e.dataTransfer.getData("taskId")

    moveTask(taskId, columnId, mutate)
  }

  const columnsSimplified = boardInfo.columns.map((col)=>{return {name: col.name, id: col.id}})

  return (
    <StyledBoard>
        {
          boardInfo.columns.map((column, index)=>{
            return (
              <StyledBoardColumn 
                onDragOver={(e)=>handleDragOver(e)}
                onDrop={(e)=>handleDrop(e, column.id)}
                key={index}
                >
                  <h2>{column.name}</h2>
                  {
                    column.tasks.map((task)=>{
                      return <Task mutate={mutate} task={task} columns={columnsSimplified}></Task>
                    })
                  }
              </StyledBoardColumn>
            )
          })
        }
        <button>Add column</button>

      

      {/* <div>
        <div>
          {
            boardInfo.columns.map((column:any, index:any)=>{
              return (<div key={column.id}>
                <h2 onClick={()=>{moveTask("5d944d54-e539-42a0-aa8a-5795d74706a6", column.id, mutate)}}>{column.name}</h2>
                <div>
                  {
                    column.tasks.map((task:any, index: any)=>{
                      return (
                        <div>{task.name}</div>
                      )
                    })
                  }
                </div>
              </div>)
            })
          }
          <br />
          <div>
            <button onClick={()=>{addColumn(boardId, "test", mutate)}}>Add new column</button>
          </div>
        </div>
      </div> */}
    </StyledBoard>
  )
}

export default BoardView