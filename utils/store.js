import { createContext, useReducer } from "react";


export const Store = createContext()

const initialState = {

    cartitem: []
}

function reducer(state, action) {
    switch (action.type) {
        case 'ADD_TO_CART':
            
            break;
    
        default:
            return state
    }
    
}

export function StoreProvider(props) {
    const [state, dispatch] = useReducer(reducer, initialState)
    const value = { state, dispatch }
    
    return <Store.Provider value={value}>
        {props.children}
    </Store.Provider>
}

// export default store