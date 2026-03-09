import React, { useContext, useState } from 'react'
import CartItem from './CartItem';
import { CartContext } from './CartContext';
import { useTheme } from './ThemeContext';

const CartExample = () => {
    // const cartItems = [
    //     { id: 1, name: "Apple" },
    //     { id: 2, name: "Banana" }
    // ];
    const [input, setInput] = useState("");
    const { cart: cartItems, dispatch } = useContext(CartContext);
    const {theme} = useTheme();
    return (
        <div style={{backgroundColor:theme == "light"?"white":"black"}}>
            <h3>Cart Example</h3>
            <input type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder='Item name' />
            <button onClick={() => dispatch(
                { 
                    type: "ADD_ITEM", 
                    payload: { id: cartItems.length + 1, name: input } 
                }) } >Add</button>
            { cartItems.map((item) => <CartItem item={item} />) }
        </div >
    )
}

export default CartExample
