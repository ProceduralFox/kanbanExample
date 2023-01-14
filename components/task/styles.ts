import styled from "styled-components";
import { DARK_GREY_1, DARK_GREY_2, WHITE, PURPLE, GREY_3 } from "../../styles/variables";


export const StyledTask = styled.li`
  max-width: 280px;
  height: 88px;

  border-radius: 8px;

  margin-bottom: 20px;

  background: ${DARK_GREY_2};

  >h2{
    color: ${WHITE}
    transition: all .2s ease-in;
  }

  &:hover{
    >h2{
      color: ${PURPLE}
    }
  }

  >p{
    color: ${GREY_3}
  }

  list-style: none;

  display: flex;
  flex-direction: column;

  justify-content: center;
  align-items: center;

  cursor: pointer;
`