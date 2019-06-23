import * as actionTypes from '../actions/actionTypes';

const initState = {
    loading: false,
    orders: [],
    purchased: false
}

const reducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.PURCHASE_INIT:
            return {
                ...state,
                purchased: false
            }
        case actionTypes.START_ORDER:
            return {
                ...state,
                loading: true
            }
        case actionTypes.ORDER_SUCCESS:
            const data = {
                id: action.payload.id,
                ...action.payload.orderData
            }
            return {
                ...state,
                loading: false,
                purchased: true,
                orders: [...state.orders, data]
            }
        case actionTypes.ORDER_FAILED:
            return {
                ...state,
                loading: false,
                purchased: true
            }
        default:
            return state
    }
}

export default reducer;