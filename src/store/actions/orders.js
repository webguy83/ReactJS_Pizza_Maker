import * as actionTypes from './actionTypes';
import axios from '../../orders-axios';

export const orderSuccess = (id, orderData) => {
    return {
        type: actionTypes.ORDER_SUCCESS,
        payload: {
            id,
            orderData
        }
    }
}

export const orderFailure = (error) => {
    return {
        type: actionTypes.ORDER_FAILED,
        error
    }
}

export const startOrder = () => {
    return {
        type: actionTypes.START_ORDER
    }
}

export const postOrderToDatabase = (orderData) => {
    return (dispatch) => {
        dispatch(startOrder());
        axios.post('/orders.json', orderData)
        .then((res) => {
            dispatch(orderSuccess(res.data.name, orderData))
        })
        .catch(err => {
            dispatch(orderFailure(err))
        });
    }
}

export const purchaseInit = () => {
    return {
        type: actionTypes.PURCHASE_INIT
    }
}