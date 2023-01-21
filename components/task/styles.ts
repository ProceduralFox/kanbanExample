import styled from "styled-components";
import { DARK_GREY_1, DARK_GREY_2, WHITE, PURPLE, GREY_3 } from "../../styles/colours";


export const StyledTask = styled.li<{darkMode: boolean}>`
  max-width: 280px;
  height: 88px;
  border-radius: 8px;

  margin-bottom: 20px;

  background: ${props=>props.darkMode?DARK_GREY_2:WHITE};

  list-style: none;

  display: flex;
  flex-direction: column;

  justify-content: center;
  align-items: center;

  cursor: pointer;

  >h3{
    transition: all .2s ease-in;
  }

  &:hover{
    >h3{
      color: ${PURPLE}
    }
  }

  >p{
    color: ${GREY_3}
  }


`