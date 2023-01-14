import styled from "styled-components";
import { DARK_GREY_2, WHITE } from "../../styles/variables";

export const StyledTopBar = styled.div<{darkMode: boolean}>`

  background: ${props=>props.darkMode?DARK_GREY_2:WHITE};

  display: flex;
  flex-direction: row;

  justify-content: space-between;

  align-items: center;

  width: 80%;

  padding-left: 24px;
  padding-right: 24px;


  >button {
    width: 164px;
  }

`