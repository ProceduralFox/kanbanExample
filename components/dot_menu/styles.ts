import styled from "styled-components";
import { DARK_GREY_1, GREY_2_OPAQUE, WHITE } from "../../styles/colours";

export const StyledDotMenuWrapper = styled.div`
  /* position: relative; */

  >img{
    cursor: pointer;
  }


`

export const StyledDotMenuContent = styled.ul<{darkMode: boolean, positions: {left:number, top: number}}>`
  width: 200px;
  height: 100px;

  border-radius: 8px;

  position: absolute;
  top: ${props=>`${props.positions.top+25}px`};
  left: ${props=>`${props.positions.left-200}px`};

  background: ${props=>props.darkMode?DARK_GREY_1:WHITE};

  z-index: 20;

  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;

  padding: 16px;

  >li{
    margin-bottom: 16px;
    cursor: pointer;
  }

`
export const StyledDotMenuBackground = styled.div<{open: boolean}>`
  width: 100%;
  height: 100%;

  position: absolute;
  top: 0;
  left: 0;

  background: ${GREY_2_OPAQUE};


  pointer-events: ${props=>props.open?`auto`:`none`};
`