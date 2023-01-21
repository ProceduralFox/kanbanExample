import styled from "styled-components";
import { DARK_GREY_2, DARK_GREY_3, GREY_2, GREY_3, PURPLE, WHITE } from "../../styles/colours";

export const StyledTopBar = styled.div<{darkMode: boolean}>`

  background: ${props=>props.darkMode?DARK_GREY_2:WHITE};

  display: flex;
  flex-direction: row;

  justify-content: space-between;

  align-items: center;

  width: 80%;

  padding-left: 24px;
  padding-right: 24px;


  border-bottom: 1px solid ${props=>props.darkMode?DARK_GREY_3:GREY_2};


  @media (max-width: 600px) {
    width: 100%;
  }

`

export const StyledTopBarButtonsSections = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    >button {
      width: 164px;
    }
    
    /* width: clamp(25%, 250px, 25%); */
    width: min(250px, 50%);

    @media (max-width: 600px) {
      width: 20%;
      >button {
        width: 48px;
        height: 32px;
        border-radius: 24px;
      }
  }

`

export const StyledTopBarMobileLogo = styled.div<{open:boolean}>`
  display: flex;
  justify-content: start;
  align-items: center;


  width: 60%;

  >img{
    margin-right: 15px;
  }


  >h1{
    position: relative;;
    :after{
      position: absolute;
      content: "";
      border: solid ${PURPLE};
      border-width: 0 3px 3px 0;
      display: inline-block;
      padding: 3px;

      transition: all .2s;
      
      transform: ${props=>props.open?`rotate(-135deg)`:`rotate(45deg)`};

      right: -20px;
      top: 13px;
    }
  }


`

export const StyledTopBarBoardsModal = styled.div<{darkMode: boolean}>`
  width: 80vw;
  padding-top: 16px;
  padding-bottom: 16px;


  border-radius: 8px;

  background: ${props=>props.darkMode?DARK_GREY_3:WHITE};



  display: flex;
  flex-direction: column;

  justify-content: center;


  

`
