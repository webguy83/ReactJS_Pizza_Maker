import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import { connect } from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactDataForm from './ContactDataForm/ContactDataForm';

class Checkout extends Component {

    continueClicked = () => {
        this.props.history.replace('/checkout/contact-data-form')
    }

    cancelClicked = () => {
        this.props.history.goBack()
    }

    render() {
        return (
            <div>
                <CheckoutSummary ingredients={this.props.ingredients} continueClicked={this.continueClicked} cancelClicked={this.cancelClicked} />
                <Route path={this.props.match.path + "/contact-data-form"} component={ContactDataForm} />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        ingredients: state.ingredients,
        totalPrice: state.totalPrice
    }
}

export default connect(mapStateToProps)(Checkout);