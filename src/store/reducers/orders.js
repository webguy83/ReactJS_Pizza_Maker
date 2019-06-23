import * as actionTypes from '../actions/actionTypes';
import updateObjState from '../utility';

const initState = {
    loading: false,
    orders: [],
    purchased: false,
    error: false
}

const purchaseInit = (state) => {
    return {
        ...state,
        purchased: false
    }
}

const buyPizzaStart = (state) => {
    return {
        ...state,
        loading: true
    }
}

const buyPizzaSuccess = (state, action) => {
    const data = {
        orderId: action.payload.id,
        data: action.payload.orderData
    }
    return updateObjState(state, {
        loading: false,
        purchased: true,
        orders: [...state.orders, data]
    });
}

const buyPizzaFailed = (state) => {
    return updateObjState(state, {
        loading: false,
        purchased: true
    });
}

const ordersStart = (state) => {
    return updateObjState(state, {
        loading: true
    });
}

const ordersSuccess = (state, action) => {
    return updateObjState(state, {
        loading: false,
        orders: action.orders
    });
}

const ordersFailed = (state) => {
    return updateObjState(state, {
        loading: false,
        error: true
    });
}

const reducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.PURCHASE_INIT: return purchaseInit(state);
        case actionTypes.BUYPIZZA_START: return buyPizzaStart(state);
        case actionTypes.BUYPIZZA_SUCCESS: return buyPizzaSuccess(state, action);
        case actionTypes.BUYPIZZA_FAILED: return buyPizzaFailed(state);
        case actionTypes.ORDERS_START: return ordersStart(state);
        case actionTypes.ORDERS_SUCCESS: return ordersSuccess(state, action);
        case actionTypes.ORDERS_FAILED: return ordersFailed(state);
        default: return state
    }
}

export default reducer;