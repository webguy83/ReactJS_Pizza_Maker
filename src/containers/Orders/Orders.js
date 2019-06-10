import React, { Component } from 'react';
import styles from './Orders.module.css';

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
        axios.get('orders.json')
            .then((res => {
                const orders = [];
                for (let prop in res.data) {
                    orders.push({
                        orderId: prop,
                        data: res.data[prop]
                    })
                }
                this.setState({ loading: false, orders })
            }))
            .catch(() => {
                this.setState({ loading: false })
            })
    }

    render() {
        const orders = this.state.loading ? <Spinner /> : this.state.orders.map(order => {
            const { address, name, postalCode } = order.data.customer;
            const { ingredients, totalPrice } = order.data;
            const { orderId } = order;
            return <Order key={orderId} 
                    orderId={orderId} 
                    customerAddress={address} 
                    customerName={name} 
                    customerPostalCode={postalCode} 
                    ingredients={ingredients} 
                    totalPrice={"$" + totalPrice.toFixed(2)} />
        });

        return (
            <div className={styles.Orders}>
                {orders}
            </div>
        );
    }
}

export default withErrorHandling(Orders, axios);