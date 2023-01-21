import styled from 'styled-components'
import { DARK_GREY_2, DARK_GREY_3, GREY_2, GREY_3, LIGHT_PURPLE, PURPLE, WHITE } from '../../styles/colours'
import { H4 } from '../../styles/typography'


export const StyledSidebar = styled.div<{darkMode: boolean}>`
  display: flex;
  flex-direction: column;

  padding-bottom: 30px;
  padding-top: 30px;
  padding-right: 12px;

  align-items: center;
  justify-content: space-between;
  transition: all .2s ease-in;
  background: ${props=>props.darkMode?DARK_GREY_2:WHITE};

  width: 20%;
  min-width: 200px;
  height: 100%;

  border-right: 1px solid ${props=>props.darkMode?DARK_GREY_3:GREY_2};

`

export const StyledSidebarHidden = styled.div`
  position: absolute;
  height: 90%;
  width: 1%;



  >button {
    border: none;
    background: ${PURPLE};
    border-radius: 0px 100px 100px 0px;
    height: 48px;
    width: 56px;

    cursor: pointer;

    position: absolute;
    bottom: 32px;

    display: flex;
    align-items: center;
    justify-content: center;

    transition: all .2s ease-in;

    &:hover{
      background: ${LIGHT_PURPLE};
    }
  }

`

export const StyledSidebarBoardsWrapper = styled.ul`
  width: 100%;
`

export const StyledSidebarBoard = styled.li<{create?: boolean, selected?:boolean}>`
  width: 100%;

  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: 24px 16px 16px 1fr 1fr;

  margin-bottom: ${props=>props.create?`0px`:`15px`};

  border-radius: 0px 100px 100px 0px;

  padding-top: 14px;
  padding-bottom: 15px;


  background: ${props=>props.selected?PURPLE:`none`};

  >img{
    grid-column: 2 / span 1;
    transition: all .2s ease-in;

    filter: ${props=>props.create?`brightness(0) saturate(100%) invert(33%) sepia(38%) saturate(1798%) hue-rotate(215deg) brightness(99%) contrast(79%)`: "none"};
    filter: ${props=>props.selected?`brightness(0) saturate(100%) invert(93%) sepia(0%) saturate(2%) hue-rotate(36deg) brightness(108%) contrast(101%)`:`none`};
  }

  >a>h3{
    transition: all .2s ease-in;
    color: ${props=>props.selected?WHITE:GREY_3}
  }
  >a, button{
    grid-column: 4 / span 2;
  }
  >button {
    background: none;
    border: none;
    padding: 0;
    vertical-align: center;
    cursor: pointer;

    >h3{
      color: ${PURPLE};
    }
  }


  :hover {
    > img {
    // i should just change the config and use an svg element with fill but this is pretty novel :D
    ${props => props.selected?``:`filter: brightness(0) saturate(100%) invert(33%) sepia(38%) saturate(1798%) hue-rotate(215deg) brightness(99%) contrast(79%)`};
    }

    >a>h3{
      ${props=> props.selected?``:`color: ${PURPLE}`};
    }

  }
`


export const StyledSidebarTitle = styled(H4)`
  color: ${GREY_3};
  margin-left: 24px;
  margin-bottom: 12px;
`

export const StyledSidebarHideButton = styled.button`
  border: none;
  background: transparent;

  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 122px;

  cursor: pointer;

  :hover{
    >h3{
      color: ${PURPLE}
    }

    >img{
      filter: brightness(0) saturate(100%) invert(33%) sepia(38%) saturate(1798%) hue-rotate(215deg) brightness(99%) contrast(79%);
    }
  }

  margin-left: 24px;
  margin-top: 22px;
  
  >h3 {
    color: ${GREY_3};
    transition: all .2s ease-in;
  }

  >img {
    filter: brightness(0) saturate(100%) invert(61%) sepia(17%) saturate(371%) hue-rotate(177deg) brightness(90%) contrast(88%);
    transition: all .2s ease-in;
  }

`