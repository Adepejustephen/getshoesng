import Cookies from 'js-cookie'

import { createContext, useReducer } from 'react'

export const Store = createContext()


const initialState = {
  cart: {
    cartItems: Cookies.get("cartItems")
      ? JSON.parse(Cookies.get("cartItems"))
      : [],
    shippingAddress: Cookies.get("shippingAddress")
      ? JSON.parse(Cookies.get("shippingAddress"))
      : {},
    shippingMethod: Cookies.get("shippingMethod")
      ? Cookies.get("shippingMethod")
      : "",
  },
  userInfo: Cookies.get("userInfo") ?JSON.parse( Cookies.get("userInfo") ): null,

};






function reducer(state, action) {
  switch (action.type) {
    case "ADD_TO_CART_ITEMS": {
      const newItem = action.payload;
      const existItem = state.cart.cartItems.find(
        (item) => item._id === newItem._id
      );

      const cartItems = existItem
        ? state.cart.cartItems.map((item) =>
            item._id === existItem._id ? newItem : item
          )
        : [...state.cart.cartItems, newItem];

      Cookies.set("cartItems", JSON.stringify(cartItems));

      return { ...state, cart: { ...state.cart, cartItems } };
    }

    case "CART_REMOVE_ITEM": {
      const cartItems = state.cart.cartItems.filter(
        (item) => item._id !== action.payload._id
      );
      Cookies.set("cartItems", JSON.stringify(cartItems));

      return { ...state, cart: { ...state.cart, cartItems } };
    }

    case "SAVE_SHIPPING_ADDRESS":
      return {
        ...state,
        cart: { ...state.cart, shippingAddress: action.payload },
      };

    case "CLEAR_CART":
      return { ...state, cart: { ...state.cart, cartItems: [] } };

    case "SAVE_SHIPPING_METHOD":
      return {
        ...state,
        cart: { ...state.cart, shippingMethod: action.payload },
      };

    case "USER_LOGIN":
      return { ...state, userInfo: action.payload };

    case "LOGOUT_USER":
      return { ...state, userInfo: null, cart: { cartItems: [], shippingAddress: {}, shippingMethod: '' } };

    default:
      return state;
  }
}

export function StoreProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState)
  const item = {dispatch, state }
  return <Store.Provider value={item}>
    {props.children}
  </Store.Provider>
}