import * as actionTypes from './actionTypes';
import axios from '../../orders-axios';

export const buyPizzaSuccess = (id, orderData) => {
    return {
        type: actionTypes.BUYPIZZA_SUCCESS,
        payload: {
            id,
            orderData
        }
    }
}

export const buyPizzaFailure = (error) => {
    return {
        type: actionTypes.BUYPIZZA_FAILED,
        error
    }
}

export const startBuyPizza = () => {
    return {
        type: actionTypes.BUYPIZZA_START
    }
}

export const postOrderToDatabase = (orderData) => {
    return (dispatch, getState) => {
        dispatch(startBuyPizza());
        const token = getState().auth.token === undefined ? localStorage.getItem('token') : getState().auth.token;
        axios.post('/orders.json?auth=' + token, orderData)
            .then((res) => {
                dispatch(buyPizzaSuccess(res.data.name, orderData))
            })
            .catch(err => {
                dispatch(buyPizzaFailure(err))
            });
    }
}

export const purchaseInit = () => {
    return {
        type: actionTypes.PURCHASE_INIT
    }
}

export const getOrdersFromDatabase = () => {
    return (dispatch, getState) => {
        dispatch(ordersStart());
        const token = getState().auth.token === undefined ? localStorage.getItem('token') : getState().auth.token;
        const userId = getState().auth.userId === undefined ? localStorage.getItem('userId') : getState().auth.userId;
        const params = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"';
        axios.get('orders.json' + params)
            .then((res => {
                const orders = [];

                for (let prop in res.data) {
                    orders.push({
                        orderId: prop,
                        data: res.data[prop]
                    })
                }
                dispatch(ordersSuccess(orders));
            }))
            .catch((err) => {
                dispatch(ordersFailed(err));
            })
    }
}

const ordersStart = () => {
    return {
        type: actionTypes.ORDERS_START
    }
}

export const ordersSuccess = (orders) => {
    return {
        type: actionTypes.ORDERS_SUCCESS,
        orders
    }
}

export const ordersFailed = () => {
    return {
        type: actionTypes.ORDERS_FAILED
    }
}

