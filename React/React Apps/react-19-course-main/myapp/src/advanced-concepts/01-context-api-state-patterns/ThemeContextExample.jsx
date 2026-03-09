import React, { useState, useContext } from 'react'
import Layout from './Layout';
import {useTheme } from './ThemeContext';
import { CartContext } from './CartContext';

const ThemeContextExample = () => {
    // const [theme, setTheme] = useState("light");
    // const toggleTheme = () => setTheme((prev) => prev == "light"? "dark":"light");
    const {theme, toggleTheme} = useTheme();
    const {cart:cartItems} = useContext(CartContext)

    // Layout

    return (
        <div style={{backgroundColor:theme == "light"?"white":"black"}}>
            <h3>Theme Context Example </h3>
            <h4>Now having {cartItems.length} Items</h4>
            {/* <Layout theme={theme} toggleTheme={toggleTheme}/> */}
            {/* <ThemeProvider> */}
                <Layout/>
            {/* </ThemeProvider> */}
        </div>
    )
}

export default ThemeContextExample
