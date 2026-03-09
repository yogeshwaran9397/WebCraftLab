import React, { useContext } from 'react'
import { CartContext } from './CartContext'

const CartItem = ({item}) => {
    const {dispatch} = useContext(CartContext)
  return (
    <div>
      {item.name}
      <button onClick={() => dispatch({type: "REMOVE_ITEM", payload: item})}>Remove</button>
    </div>
  )
}

export default CartItem
