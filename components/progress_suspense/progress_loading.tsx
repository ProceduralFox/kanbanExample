import React, { useContext } from 'react'
import { ProgressBar } from 'react-loader-spinner';
import { BLACK, PURPLE, WHITE } from '../../styles/colours';
import { DarkModeContext } from '../../context/darkmode_context';


type Props = {
  children: JSX.Element,
  isLoading: boolean
}

const ProgressLoading = (props: Props) => {
  const { isLoading, children } = props
  const { darkMode } = useContext(DarkModeContext)

  if(isLoading) {
    return (
      <div style={{margin:"auto"}}>
        <ProgressBar
          height="80"
          width="80"
          borderColor={PURPLE}
          barColor={darkMode?WHITE:BLACK}
        />
        </div> 
    )
  }

  return children
}

export default ProgressLoading