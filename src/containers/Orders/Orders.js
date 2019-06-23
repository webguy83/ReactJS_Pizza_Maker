import React, { Component } from 'react';
import styles from './Orders.module.css';

import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

import axios from '../../orders-axios';
import withErrorHandling from '../../hoc/withErrorHandling/withErrorHandling';

import Spinner from '../../components/UI/Spinner/Spinner';
import Order from '../../components/Order/Order';

class Orders extends Component {

    state = {
        orders: [],
        loading: true
    }

    componentDidMount() {
        this.props.loadOrders();
    }

    render() {
        const orders = this.props.loading ? <Spinner /> : this.props.orders.map(order => {
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
                totalPrice={"$" + totalPrice.toFixed(2)} />
        });

        return (
            <div className={styles.Orders}>
                {orders}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        orders: state.order.orders,
        error: state.order.error,
        loading: state.order.loading
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