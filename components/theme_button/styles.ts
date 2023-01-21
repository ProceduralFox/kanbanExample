import styled from "styled-components";
import { DARK_GREY_1, GREY_1, PURPLE, WHITE } from "../../styles/colours";



export const StyledThemeButtonWrapper = styled.div<{darkMode: boolean}>`
  height: 48px;


  border-radius: 6px;
  margin-left: 24px;
  margin-right: 12px;
  margin-top: 12px;



  background: ${props=>props.darkMode?DARK_GREY_1:GREY_1};

  display: flex;
  align-items: center;
  justify-content: center;

  >div{
    width: 60%;
    display: flex;
    justify-content: space-between;
  }

`

export const StyledThemeButtonSelector = styled.button<{ballPosition: "left" | "right"}>`
  width: 40px;
  height: 20px;
  border-radius: 12px;

  background: ${PURPLE};

  cursor: pointer;

  border: none;

  position: relative;


  &::after{
    border-radius: 50%;
    height: 14px;
    width: 14px;
    content: "";
    position: absolute;
    top: 3px;
    left: ${props=>props.ballPosition==="left"?`6px`:`calc(100%-14px)`};

    background: ${WHITE};
  }
`