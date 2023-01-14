import styled from "styled-components";
import { GREY_2_OPAQUE } from "../../styles/variables";




export const StyledModalBackground = styled.div`
  position: absolute;

  top: 0;
  right: 0;

  z-index: 10;

  width: 100%;
  height: 100%;

  background: ${GREY_2_OPAQUE};

  display: flex;
  justify-content: center;
  align-items: center;
`

export const StyledModalCenter = styled.div`
  background: white;
  border-radius: 6px;

  min-width: 200px;
  min-height: 200px;
`