import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactDataForm from './ContactDataForm/ContactDataForm';

class Checkout extends Component {

    continueClicked = () => {
        this.props.history.replace('/checkout/contact-data-form');
    }

    cancelClicked = () => {
        this.props.history.goBack()
    }

    render() {
        const isPurchased = this.props.purchased ? <Redirect to="/" /> : null;
        const summary = this.props.ingredients ? <div>
            {isPurchased}
            <CheckoutSummary ingredients={this.props.ingredients} continueClicked={this.continueClicked} cancelClicked={this.cancelClicked} />
            <Route path={this.props.match.path + "/contact-data-form"} component={ContactDataForm} />
        </div> : <Redirect to="/" />;
        return summary;
    }
}

const mapStateToProps = (state) => {
    return {
        ingredients: state.pizzaMaker.ingredients,
        orders: state.order.orders,
        purchased: state.order.purchased
    }
}

export default connect(mapStateToProps)(Checkout);