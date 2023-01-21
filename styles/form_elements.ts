import styled from "styled-components";
import { BLACK, DARK_GREY_2, GREY_3, WHITE } from "./colours";




export const StyledLabel = styled.label<{darkMode: boolean}>`
  color: ${props=>props.darkMode?WHITE:GREY_3};
`

export const StyledInput = styled.input<{darkMode: boolean, textArea?: boolean}>`
  color: ${props=>props.darkMode?WHITE:BLACK};

  width: 100%;

  height: 40px;

  background: ${props=>props.darkMode?DARK_GREY_2:WHITE};

`

export const StyledTextArea = styled.textarea<{darkMode: boolean}>`
  color: ${props=>props.darkMode?WHITE:BLACK};

  width: 100%;

  height: 112px;

  resize: none;

  background: ${props=>props.darkMode?DARK_GREY_2:WHITE};

`


export const StyledSelect = styled.select<{darkMode: boolean}>`
  color: ${props=>props.darkMode?WHITE:BLACK};

  width: 100%;

  height: 40px;

  background: ${props=>props.darkMode?DARK_GREY_2:WHITE};

`