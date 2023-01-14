import React, { useState } from 'react'
import { StyledLayout } from './styles'
import Sidebar from '../sidebar/sidebar_component'
import Modal from '../modal/modal'

type Props = {
  children?: React.ReactNode
}



const Layout = (props: Props) => {
  const { children } = props


  return (
    <StyledLayout>
      <div style={{background: "hotpink", width: "100%", height: "10%", display: "flex"}}>
        <div style={{background: "lightblue", width: "20%"}}>Kanban + logo</div>
        {/* <div>top bar</div> part of children */}
      </div>
      <div style={{display: "flex", height: "90%"}}>
        <Sidebar></Sidebar>
        <div style={{width: "80%", overflow: "auto"}}>
          {children}
        </div>
      </div>
    </StyledLayout>
  )
}

export default Layout