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
    return (dispatch) => {
        dispatch(startBuyPizza());
        axios.post('/orders.json', orderData)
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
    return (dispatch) => {
        dispatch(ordersStart());
        axios.get('orders.json')
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

export const ordersFailed = (error) => {
    return {
        type: actionTypes.ORDERS_FAILED,
        error
    }
}

