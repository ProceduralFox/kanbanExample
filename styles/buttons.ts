import styled from "styled-components";
import { LIGHT_PURPLE, PURPLE, PURPLE_OPAQUE, WHITE, RED, LIGHT_RED } from "./variables";

const StyledButtonBase = styled.button`
  border: none;
  background: none;


  height: 40px;
  width: 100%;
  border-radius: 20px;

  display: flex;
  align-items: center;
  justify-content: center;

  transition: all .3s ease-out;

  cursor: pointer;

`

export const StyledButtonPrimary = styled(StyledButtonBase)<{isLarge?: boolean }>`

  ${
    props => props.isLarge? `
      height: 48px;
      border-radius: 24px;
    ` : ``
  }

  background: ${PURPLE};

  color: ${WHITE};

  :hover{
    background: ${LIGHT_PURPLE};
  }

`

export const StyledButtonSecondary = styled(StyledButtonBase)<{darkMode: boolean}>`

  color: ${PURPLE};

  background: ${
    props => props.darkMode? WHITE : PURPLE_OPAQUE("0.1")
  };

  :hover{
    background: ${
      props => props.darkMode ? WHITE : PURPLE_OPAQUE("0.25")
    };
  }

`

export const StyledButtonDestructive = styled(StyledButtonBase)`

  color: ${WHITE};

  background: ${RED};

  :hover{
    background: ${LIGHT_RED}
  }
`