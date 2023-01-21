import styled from "styled-components";
import { BLACK, DARK_GREY_1, GREY_1, GREY_3, GREY_3_OPAQUE, LIGHT_PURPLE, PURPLE, PURPLE_OPAQUE, WHITE } from "../../styles/colours";
import { H4 } from "../../styles/typography";

export const StyledSubtaskCheckboxWrapper = styled.div<{darkMode: boolean}>`
  min-height: 40px;
  width: 100%;
  /* max-width: 400px; */
  border-radius: 4px;
  height: ;

  padding: 12px;

  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: left;

  background: ${props=>props.darkMode?DARK_GREY_1:GREY_1};

  transition: all .2s ease-in;

  &:hover{
    background: ${PURPLE_OPAQUE("0.25")};
  } 

  margin-bottom: 8px;

`

export const StyledSubtaskCheckboxText = styled(H4)<{completed: boolean}>`
  
  color: ${props=>props.darkMode?WHITE:BLACK};
  
  ${props=>props.completed?`
  text-decoration: line-through ${GREY_3};
  color: ${GREY_3}`:``};

  
`



export const StyledVisibleCheckbox = styled.div<{darkMode: boolean, selected: boolean}>`
  width: 12px;
  height: 12px;

  background: ${props=>props.darkMode?GREY_3_OPAQUE("0.25"):WHITE};

  border-radius: 2px;

  margin-right: 20px;

  ${
    props=>props.selected?`
    background: ${PURPLE};`:``
  }

    display: flex;
    justify-content: center;
    align-items:center;

  >img{
    display: ${props=>props.selected?`flex`:`none`};
  }
`

