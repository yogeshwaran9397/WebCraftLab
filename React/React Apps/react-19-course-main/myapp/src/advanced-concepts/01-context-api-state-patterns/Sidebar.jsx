import React from 'react'
import ThemeToggler from './ThemeToggler'

// const Sidebar = ({theme, toggleTheme}) => {
const Sidebar = () => {
  return (
    <div>
        <h3>Sidebar</h3>
        {/* <ThemeToggler theme={theme} toggleTheme={toggleTheme}/> */}
        <ThemeToggler />
    </div>
  )
}

export default Sidebar
