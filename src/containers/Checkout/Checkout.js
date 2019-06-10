import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactDataForm from './ContactDataForm/ContactDataForm';

class Checkout extends Component {
    state = {
        ingredients: [],
        totalPrice: 0
    }

    componentDidMount() {
        const ingredientsAndTotalPrice = this.props.location.search.replace('?', "").split("&");
        const totalPrice = Number(ingredientsAndTotalPrice.slice(-1)[0].split("=")[1]);
        const ingredients = ingredientsAndTotalPrice.slice(0, -1);

        if (ingredients.length > 1 || ingredients[0] !== "") {
            this.setState({
                ingredients,
                totalPrice
            })
        }
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
                <CheckoutSummary ingredients={this.state.ingredients} continueClicked={this.continueClicked} cancelClicked={this.cancelClicked} />
                <Route path={this.props.match.path + "/contact-data-form"} render={(props) => <ContactDataForm ingredients={this.state.ingredients} totalPrice={this.state.totalPrice} {...props} />} />
            </div>

        );
    }
}

export default Checkout;