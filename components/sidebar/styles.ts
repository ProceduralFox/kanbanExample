import styled from 'styled-components'
import { DARK_GREY_2, GREY_3, PURPLE, WHITE } from '../../styles/variables'


export const StyledSidebar = styled.div<{darkMode: boolean}>`
  display: flex;
  flex-direction: column;

  align-items: center;
  justify-content: space-between;
  background: ${props=>props.darkMode?DARK_GREY_2:WHITE};

  width: 20%;
  min-width: 200px;
  height: 100%;

  

`

export const StyledSidebarBoardsWrapper = styled.ul`
  width: 100%;
`

export const StyledSidebarBoard = styled.li<{create?: boolean, selected?:boolean}>`
  width: 100%;

  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: 32px 16px 16px 1fr 1fr;

  margin-bottom: 15px;

  border-radius: 0px 100px 100px 0px;

  padding-top: 14px;
  padding-bottom: 15px;

  background: ${props=>props.selected?PURPLE:`none`};

  >img{
    grid-column: 2 / span 1;

    filter: ${props=>props.create?`brightness(0) saturate(100%) invert(33%) sepia(38%) saturate(1798%) hue-rotate(215deg) brightness(99%) contrast(79%)`: "none"};
    filter: ${props=>props.selected?`brightness(0) saturate(100%) invert(93%) sepia(0%) saturate(2%) hue-rotate(36deg) brightness(108%) contrast(101%)`:`none`};
  }

  >a>h3{
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