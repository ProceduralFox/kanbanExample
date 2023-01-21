import styled from "styled-components";
import { BLACK, DARK_GREY_1, GREY_1, PURPLE, WHITE } from "../../styles/colours";
import { StyledBoard } from "../board/styles";


export const StyledLayout = styled.main<{darkMode: boolean}>`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;

  background-color: ${props=>props.darkMode?DARK_GREY_1:GREY_1};
`

export const StyledHomepage = styled(StyledBoard)`
  align-items: center;
  justify-content: center;

  color: ${props=>props.darkMode?WHITE:BLACK};
`