import React, { useContext, useState } from 'react'
import { DarkModeContext } from '../../context/darkmode_context'
import Modal from '../modal/modal'
import TaskForm from '../task/form/task_form'
import { StyledTopBar } from './styles'
import { H1 } from '../../styles/typography'
import { StyledButtonPrimary } from '../../styles/buttons'

type Props = {
  board: {id:string, title:string}
  columns: {name: string, id: string}[]
  mutate: Function

}


const TopBar = (props: Props) => {
  const { board, columns, mutate } = props
  const { darkMode } = useContext(DarkModeContext)

  const [modalHidden, setModalHidden] = useState(true)

  return (
    <>
      <StyledTopBar darkMode={darkMode}>
        <H1 darkMode={darkMode}>{board.title}</H1>
        <StyledButtonPrimary onClick={()=>{setModalHidden(false)}}>+ Add New Task</StyledButtonPrimary>
      </StyledTopBar>
      <Modal hidden={modalHidden} setHidden={setModalHidden}>
          <TaskForm columns={columns} setHidden={setModalHidden} mutate={mutate} board_id={board.id}></TaskForm>
      </Modal>
    </>
  )
}

export default TopBar