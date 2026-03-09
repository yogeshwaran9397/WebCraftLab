import React from 'react'
import ThemeContextExample from './ThemeContextExample'
import CartExample from './CartExample'
import { ThemeProvider } from './ThemeContext'
import { CartProvider } from './CartContext'

const MyAppExample = () => {
    return (
        <div>
            <h1>Home Page</h1>
            <CartProvider>
                <ThemeProvider>
                    <ThemeContextExample />
                    <CartExample />
                </ThemeProvider>
            </CartProvider>
        </div>
    )
}

export default MyAppExample
