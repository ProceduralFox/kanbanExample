import React, { useContext, useState } from 'react'
import { DarkModeContext } from '../../context/darkmode_context'
import Modal from '../modal/modal'
import TaskForm from '../forms/task_form'
import { StyledTopBar, StyledTopBarBoardsModal, StyledTopBarButtonsSections, StyledTopBarMobileLogo } from './styles'
import { H1 } from '../../styles/typography'
import { StyledButtonPrimary } from '../../styles/buttons'
import DotMenu from '../dot_menu/dot_menu'
import EditBoardForm from '../forms/edit_board_form'
import { FullBoard} from '../../types/responses'
import DeleteForm from '../forms/delete_form'
import { RED } from '../../styles/colours'
import { StyledFormButtonsSection } from '../forms/styles'
import { useWindowSize } from '../../hooks/useWindowSize'
import Image from 'next/image'
import ThemeButton from '../theme_button/theme_button'
import BoardView from '../board/board'
import BoardsList from '../boards_list/boards_list'
import truncateString from '../../functions/truncate_string'


type Props = {
  board: FullBoard
  columns: {name: string, id: string}[]
  

}


const TopBar = (props: Props) => {
  const { board, columns, mutate } = props
  const { darkMode } = useContext(DarkModeContext)

  const size = useWindowSize()

  const [modalTaskHidden, setModalTaskHidden] = useState(true)
  const [modalBoardHidden, setModalBoardHidden] = useState(true)
  const [modalDeleteBoardHidden, setModalDeleteBoardHidden] = useState(true)
  const [modalBoardsListHidden, setModalBoardsListHidden] = useState(true)


  const simplifiedBoard = {...board, columns: board.columns.map((col)=>{
    const simplifiedColumn: {name: string, id: string, board_id: string, toDelete?: boolean} = {name: col.name, id: col.id, board_id: board.id}
    return simplifiedColumn
  })}

  const getTruncatedTitle = (maxLen: number) => {
    if (board.name.length<maxLen) return <H1 darkMode={darkMode}>{board.name}</H1>
    
    return <H1 darkMode={darkMode} title={board.name}>{truncateString(board.name, maxLen, "...")}</H1>
  }
  
  // TODO - bug with creating new task if no columns exists

  const dotOptions = [
    {display: "Edit Board", click: ()=>{setModalBoardHidden(false)}}, 
    {display: "Delete Board", click: ()=>{setModalDeleteBoardHidden(false)}, colour: RED}]


  if(size.width && size.width < 600) {
    return ( <>
    <StyledTopBar darkMode={darkMode}>
      <StyledTopBarMobileLogo open={!modalBoardsListHidden} onClick={()=>setModalBoardsListHidden(false)}>
        <Image alt='main logo, three vertical lines of fading opacity' src={"/main_logo.svg"} height={25} width={25}></Image>
        {getTruncatedTitle(10)}
      </StyledTopBarMobileLogo>
      <StyledTopBarButtonsSections>
        <StyledButtonPrimary onClick={()=>{setModalTaskHidden(false)}}>+</StyledButtonPrimary>
        <DotMenu options={dotOptions}></DotMenu>
      </StyledTopBarButtonsSections>
    </StyledTopBar>

    <Modal hidden={modalBoardsListHidden} setHidden={setModalBoardsListHidden}>
      <StyledTopBarBoardsModal darkMode={darkMode}>
        <BoardsList></BoardsList>
        <ThemeButton></ThemeButton>
      </StyledTopBarBoardsModal>
    </Modal>

    <Modal hidden={modalTaskHidden} setHidden={setModalTaskHidden}>
        <TaskForm columns={columns} setHidden={setModalTaskHidden} mutate={mutate} board_id={board.id}></TaskForm>
    </Modal>
    <Modal hidden={modalBoardHidden} setHidden={setModalBoardHidden}>
      <EditBoardForm board={simplifiedBoard} mutate={mutate} setHidden={setModalBoardHidden}></EditBoardForm>
    </Modal>
    <Modal hidden={modalDeleteBoardHidden} setHidden={setModalDeleteBoardHidden}>
      <DeleteForm setHidden={setModalDeleteBoardHidden} type='board' mutate={mutate} name={board.name} id={board.id}></DeleteForm>
    </Modal>
  </>)
  }

  return (
    <>
      <StyledTopBar darkMode={darkMode}>
        {size.width && size.width < 1000?
        getTruncatedTitle(15):
        getTruncatedTitle(150)  
      }
        <StyledTopBarButtonsSections>
          <StyledButtonPrimary onClick={()=>{setModalTaskHidden(false)}}>+ Add New Task</StyledButtonPrimary>
          <DotMenu options={dotOptions}></DotMenu>
        </StyledTopBarButtonsSections>

      </StyledTopBar>
      <Modal hidden={modalTaskHidden} setHidden={setModalTaskHidden}>
          <TaskForm columns={columns} setHidden={setModalTaskHidden} mutate={mutate} board_id={board.id}></TaskForm>
      </Modal>
      <Modal hidden={modalBoardHidden} setHidden={setModalBoardHidden}>
        <EditBoardForm board={simplifiedBoard} mutate={mutate} setHidden={setModalBoardHidden}></EditBoardForm>
      </Modal>
      <Modal hidden={modalDeleteBoardHidden} setHidden={setModalDeleteBoardHidden}>
        <DeleteForm setHidden={setModalDeleteBoardHidden} type='board' mutate={mutate} name={board.name} id={board.id}></DeleteForm>
      </Modal>
    </>
  )
}

export default TopBar