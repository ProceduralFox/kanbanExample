import styled from "styled-components";
import { DARK_GREY_2, DARK_GREY_3, GREY_2, WHITE } from "../../styles/colours";


export const StyledLogoBar = styled.div<{darkMode: boolean}>`
  width: 20%;
  min-width: 200px;
  /* flex-grow: 1; */

  display: flex;
  padding: 34px;

  justify-content: left;
  align-items: center;

  background: ${props=>props.darkMode?DARK_GREY_2:WHITE};

  border-bottom: 1px solid ${props=>props.darkMode?DARK_GREY_3:GREY_2};
  border-right: 1px solid ${props=>props.darkMode?DARK_GREY_3:GREY_2};

  >img{
    margin-right: 5px;
  }

  @media (max-width: 600px) {
    width: unset;
    flex-grow: 1;
    border-right: none;

    justify-content: center;
}
  
`