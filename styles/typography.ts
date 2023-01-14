import styled from "styled-components";
import { BLACK, WHITE } from "./variables";

export const H1 = styled.h1<{darkMode: boolean}>`
  color: ${props=>props.darkMode?WHITE:BLACK};
  font-size: 24px;
  font-weight: 700;
  line-height: 30px;
  letter-spacing: 0px;
  text-align: left;
`

export const H2 = styled.h2<{darkMode: boolean}>`
  color: ${props=>props.darkMode?WHITE:BLACK};
  font-size: 18px;
  font-weight: 700;
  line-height: 23px;
  letter-spacing: 0px;
  text-align: left;
`

export const H3 = styled.h3<{darkMode: boolean}>`
  color: ${props=>props.darkMode?WHITE:BLACK};
  font-size: 15px;
  font-weight: 700;
  line-height: 19px;
  letter-spacing: 0px;
  text-align: left;
`

export const H4 = styled.h3<{darkMode: boolean}>`
  color: ${props=>props.darkMode?WHITE:BLACK};
  font-size: 12px;
  font-weight: 700;
  line-height: 15px;
  letter-spacing: 2.4000000953674316px;
  text-align: left;
`

export const paragraphLarge = styled.p`
  font-size: 13px;
  font-weight: 500;
  line-height: 23px;
  letter-spacing: 0px;
  text-align: left;
`
export const paragraphMedium = styled.p`
  font-size: 13px;
  font-weight: 500;
  line-height: 23px;
  letter-spacing: 0px;
  text-align: left;
`