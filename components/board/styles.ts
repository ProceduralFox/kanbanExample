import styled from "styled-components";
import { CYAN, DARK_GREY_1, DARK_GREY_2, GREY_1, GREY_2, GREY_3, PURPLE } from "../../styles/colours";
import { H4 } from "../../styles/typography";

export const StyledBoard = styled.div<{darkMode: boolean}>`

  height: 100%;
  width: 80%;

  flex-grow: 1;

  padding: 24px;

  background-color: ${props=>props.darkMode?DARK_GREY_1:GREY_1};
  display: flex;

  flex-wrap: nowrap;

  flex-direction: row;
  
  justify-content: left;
  align-items: start;

  overflow: auto;
`

export const StyledBoardColumn = styled.li<{center?:boolean}>`
  display: flex;
  flex-direction: column;

  ${props=>props.center?`
    justify-content: center;
    align-items: center;

    background: linear-gradient(180deg, rgba(43, 44, 55, 0.25) 0%, rgba(43, 44, 55, 0.125) 100%);
  `: ''}

  min-width: 300px;
  height: 100%;
`

export const StyledBoardColumnTitle = styled(H4)<{isEven: number}>`

  position: relative;

  margin-left: 27px;
  margin-bottom: 24px;

  color: ${GREY_3};

  &:before{
    width: 15px;
    height: 15px;

    border-radius: 50%;

    position: absolute;
    left: -27px;
    top:0;
    content: "";

    background: ${props=>props.isEven?PURPLE:CYAN};
  }
`