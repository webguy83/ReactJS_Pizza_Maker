import React, { Component } from 'react';
import styles from './ContactDataForm.module.css';

import axios from '../../../orders-axios';

import Spinner from '../../../components/UI/Spinner/Spinner';

import GenericButton from '../../../components/UI/GenericButton/GenericButton';

class ContactDataForm extends Component {

    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        },
        loading: false
    }

    orderClicked = (e) => {
        e.preventDefault();

        this.setState({ loading: true })
        const order = {
            ingredients: this.props.ingredients,
            totalPrice: this.props.totalPrice + (this.props.totalPrice * .12),
            customer: {
                name: "The Rock",
                address: "32748 43 Know Your Role Blv",
                postalCode: "90120V"
            }
        }

        axios.post('/orders.json', order)
            .then(res => {
                this.setState({ loading: false});
                this.props.history.push('/');
            })
            .catch(err => {
                this.setState({ loading: false});
            });
    }

    render() {
        let order = (<form className={styles.form}>
            <input className={styles.input} type="text" name="name" placeholder="Your Name" />
            <input className={styles.input} type="email" name="email" placeholder="Your Email" />
            <input className={styles.input} type="text" name="street" placeholder="Your Street" />
            <input className={styles.input} type="text" name="postal" placeholder="Your Postal Code" />
            <GenericButton btnType="Success" clicked={this.orderClicked}>Place Your Order!</GenericButton>
        </form>);
        if(this.state.loading) {
            order = <Spinner />
        }
        return (
            <div className={styles.ContactDataForm}>
                <h2 className={styles.header}>Contact Form:</h2>
                {order}
            </div>
        );
    }
}

export default ContactDataForm;