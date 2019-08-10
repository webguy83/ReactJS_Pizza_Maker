import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactDataForm from './ContactDataForm/ContactDataForm';

const Checkout = (props) => {

    const continueClicked = () => {
        props.history.replace('/checkout/contact-data-form');
    }

    const cancelClicked = () => {
        props.history.goBack()
    }

    const isPurchased = props.purchased ? <Redirect to="/" /> : null;
    const summary = props.ingredients ? <div>
        {isPurchased}
        <CheckoutSummary ingredients={props.ingredients} continueClicked={continueClicked} cancelClicked={cancelClicked} />
        <Route path={props.match.path + "/contact-data-form"} component={ContactDataForm} />
    </div> : <Redirect to="/" />;
    return summary;

}

const mapStateToProps = (state) => {
    return {
        ingredients: state.pizzaMaker.ingredients,
        orders: state.order.orders,
        purchased: state.order.purchased
    }
}

export default connect(mapStateToProps)(Checkout);