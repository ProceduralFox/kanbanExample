import styled from "styled-components";
import { WHITE, DARK_GREY_2 } from "../../../styles/variables";

export const StyledFormWrapper = styled.div<{darkMode:boolean}>`

  padding: 32px;
  border-radius: 6px;

  background ${props=>props.darkMode?DARK_GREY_2:WHITE};


`

export const StyledFormSection = styled.div`

  margin-bottom: 24px;

`

export const StyledFormSubtaskWrapper = styled.div`
  display: flex;

  justify-content: space-between;
  align-items: center;

  >input{
    width: 90%
  }

  margin-bottom: 12px;

`