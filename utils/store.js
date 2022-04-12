import Cookies from 'js-cookie'
import { createContext, useReducer } from 'react'

export const Store = createContext()

const initialState = {
  cart: {
    cartItems: Cookies.get('cartItem') ? JSON.parse(Cookies.get('cartItems')) : []
  }
}

function reducer(state, action) {
  switch (action.type) {
    case 'ADD_TO_CART_ITEMS': {
      const newItem = action.payload;
      const existItem = state.cart.cartItems.find(
        (item) => item.name === newItem.name
      )

      const cartItems = existItem ? state.cart.cartItems.map((item) => item.name === existItem.name ? newItem : item) : [...state.cart.cartItems, newItem];

      Cookies.set('cartItems', JSON.stringify(cartItems));
      
      return {...state, cart: {...state.cart, cartItems}}
    }
      
    default:
      return state
  }
}

export function StoreProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState)
  const item = {dispatch, state }
  return <Store.Provider value={item}>
    {props.children}
  </Store.Provider>
}