import styled from "styled-components";
import { WHITE, DARK_GREY_2 } from "../../styles/colours";

export const StyledFormWrapper = styled.div<{darkMode:boolean, setWidth?: string}>`

  padding: 32px;
  border-radius: 6px;

  width: 350px;
  max-width: 80vw;
  max-height: 80vh;

  overflow: auto;
  background ${props=>props.darkMode?DARK_GREY_2:WHITE};

  ${props=>props.setWidth?`
    width: ${props.setWidth};
  `:``}
`

export const StyledFormSection = styled.div`

  margin-bottom: 24px;

`

export const StyledFormButtonsSection = styled(StyledFormSection)`
  display: flex;
  justify-content: space-between;
  align-items: center;
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

export const StyledFormScrollableSection = styled.div`
  width: "100%";
  padding: "0";

`