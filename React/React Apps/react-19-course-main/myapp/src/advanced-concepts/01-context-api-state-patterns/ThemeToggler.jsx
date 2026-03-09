import React, { useContext } from 'react'
import { useTheme } from './ThemeContext'

// const ThemeToggler = ({theme, toggleTheme}) => {
const ThemeToggler = () => {
  const {theme, toggleTheme} = useTheme();
  return (
    <button onClick={toggleTheme}>
        Switch to {theme == "light" ? "dark" : "light"} mode
    </button>
  )
}

export default ThemeToggler
