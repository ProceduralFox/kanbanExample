import styled from "styled-components";
import { PURPLE } from "../../styles/variables";


export const StyledBoard = styled.div`

  min-height: 100%;
  min-width: 100%;

  background-color: ${PURPLE};

  display: flex;

  flex-wrap: nowrap;

  flex-direction: row;
  
  justify-content: left;
  align-items: start;

  overflow: auto;
`

export const StyledBoardColumn = styled.li`
  display: flex;
  flex-direction: column;

  min-width: 300px;
  min-height: 90vh;
`