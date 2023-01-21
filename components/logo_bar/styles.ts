import styled from "styled-components";
import { DARK_GREY_2, DARK_GREY_3, GREY_2, WHITE } from "../../styles/colours";


export const StyledLogoBar = styled.div<{darkMode: boolean}>`
  width: 20%;
  min-width: 200px;

  display: flex;

  justify-content: center;
  align-items: center;

  background: ${props=>props.darkMode?DARK_GREY_2:WHITE};

  border-bottom: 1px solid ${props=>props.darkMode?DARK_GREY_3:GREY_2};
  border-right: 1px solid ${props=>props.darkMode?DARK_GREY_3:GREY_2};
  
`