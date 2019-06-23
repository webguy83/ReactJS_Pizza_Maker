import * as actionTypes from '../actions/actionTypes';

const initState = {
    loading: false,
    orders: [],
    purchased: false,
    error: false
}

const reducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.PURCHASE_INIT:
            return {
                ...state,
                purchased: false
            }
        case actionTypes.BUYPIZZA_START:
            return {
                ...state,
                loading: true
            }
        case actionTypes.BUYPIZZA_SUCCESS:
            const data = {
                orderId: action.payload.id,
                data: action.payload.orderData
            }
            return {
                ...state,
                loading: false,
                purchased: true,
                orders: [...state.orders, data]
            }
        case actionTypes.BUYPIZZA_FAILED:
            return {
                ...state,
                loading: false,
                purchased: true
            }
        case actionTypes.ORDERS_START:
            return {
                ...state,
                loading: true
            }
        case actionTypes.ORDERS_SUCCESS:
            return {
                ...state,
                loading: false,
                orders: action.orders
            }
        case actionTypes.ORDERS_FAILED:
            return {
                ...state,
                loading: false,
                error: action.error
            }
        default:
            return state
    }
}

export default reducer;