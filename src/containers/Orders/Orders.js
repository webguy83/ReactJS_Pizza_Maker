import React, { useEffect } from 'react';
import styles from './Orders.module.css';

import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

import axios from '../../orders-axios';
import withErrorHandling from '../../hoc/withErrorHandling/withErrorHandling';

import Spinner from '../../components/UI/Spinner/Spinner';
import Order from '../../components/Order/Order';

const Orders = (props) => {

    const { orders, loading } = props;

    useEffect(() => {
        props.loadOrders();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    
    const ordersOutput = loading ? <Spinner /> : orders.map(order => {
        const { address, name, postalCode, comments } = order.data.customerData;
        const { ingredients, totalPrice } = order.data;
        const { orderId } = order;
        return <Order key={orderId}
            orderId={orderId}
            customerAddress={address}
            customerName={name}
            customerPostalCode={postalCode}
            ingredients={ingredients}
            customerComments={comments}
            totalPrice={"$" + totalPrice.toFixed(2)}
        />
    });

    return (
        <div className={styles.Orders}>
            <h1 className={styles.ordersHeader}>{orders.length > 0 ? "Here are your orders!" : !loading ? "You currently don't have any orders. Please order some of your tasty pizza and come back to check our orders here!" : null}</h1>
            {ordersOutput}
        </div>
    );
}

const mapStateToProps = (state) => {
    const { orders, error, loading } = state.order;
    return {
        orders,
        error,
        loading
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        loadOrders: () => {
            dispatch(actions.getOrdersFromDatabase())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandling(Orders, axios));