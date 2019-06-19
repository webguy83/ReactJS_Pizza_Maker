import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import { connect } from 'react-redux';
import * as actionTypes from '../../store/actions';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactDataForm from './ContactDataForm/ContactDataForm';

class Checkout extends Component {

    componentWillUnmount() {
        this.props.alterIngredients(null);
        this.props.totalPrice(5.99);
    }

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
                <Route path={this.props.match.path + "/contact-data-form"} render={(props) => <ContactDataForm  {...props} />} />
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        alterIngredients: (ingredients) => {
            return dispatch({ type: actionTypes.INGREDIENTS, defaultIngredients: ingredients })
        },
        totalPrice: (tPrice) => {
            return dispatch({ type: actionTypes.TOTAL_PRICE, totalPrice: tPrice })
        }
    }
}

const MapStateToProps = (state) => {
    return {
        ingredients: state.ingredients,
        totalPrice: state.totalPrice
    }
}

export default connect(MapStateToProps, mapDispatchToProps)(Checkout);