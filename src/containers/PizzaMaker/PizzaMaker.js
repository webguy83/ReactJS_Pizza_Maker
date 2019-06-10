import React, { Component } from 'react';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import withErrorHandling from '../../hoc/withErrorHandling/withErrorHandling';

import axios from '../../orders-axios';

import OrderSummary from '../../components/Pizza/OrderSummary/OrderSummary';
import Modal from '../../components/UI/Modal/Modal';
import Pizza from '../../components/Pizza/Pizza';
import PizzaControls from '../../components/Pizza/PizzaControls/PizzaControls';

import Spinner from '../../components/UI/Spinner/Spinner';

class PizzaMaker extends Component {

    ingredientPrice = 0.99;

    state = {
        ingredients: null,
        totalPrice: 5.99,
        purchasing: false,
        orderPurchased: false,
        loading: false,
        error: false
    }

    componentDidMount() {
        axios.get('/ingredients.json')
            .then(res => {
                const ingredients = res.data.map(ing => { // convert ingredients array to an object form with type and purchased as keys
                    return {
                        type: ing,
                        purchased: false
                    }
                });
                this.setState({
                    ingredients: ingredients
                })
            })
            .catch(() => {
                this.setState({
                    error: true
                })
            })
    }

    addIngredientHandler = (type) => {
        const newIngredients = [...this.state.ingredients]; // copy ingredients from state
        const newIngIndex = newIngredients.findIndex(ing => { // find the ingredient item to add or remove
            return ing.type === type;
        });

        newIngredients[newIngIndex].purchased = !newIngredients[newIngIndex].purchased; // add or remove the ingredient from the cart

        this.setState({
            ingredients: newIngredients,
            totalPrice: newIngredients[newIngIndex].purchased ? this.state.totalPrice + this.ingredientPrice : this.state.totalPrice - this.ingredientPrice //if incredient is purchased then add to the subtotal price otherwise deduct it from the total
        })
    }

    orderHandler = () => {
        this.setState({ purchasing: true, orderPurchased: false });
    }

    closeBackdropHandler = () => {
        this.setState({ purchasing: false });
    }

    continueBtnOrderHandler = () => {
        const queryedIngredients = this.state.ingredients.filter(ing => {
            return ing.purchased === true;
        }).map(ing => {
            return ing.type;
        })
        queryedIngredients.push("price=" + this.state.totalPrice);
        const joinedIngredientsAndPrice = queryedIngredients.join("&")

        this.props.history.push({
            pathname: '/checkout',
            search: "?" + joinedIngredientsAndPrice
        });
    }

    render() {
        let orderSummary = null;
        let pizza = this.state.error ? <p style={{ color: "red", textTransform: "uppercase", fontSize: "3.3rem" }}>Sorry the ingredients failed to load for you. Contact me asap! Arghhhh.</p> : <Spinner />;

        if (this.state.ingredients) {
            pizza = (<Auxiliary>
                <Pizza ingredients={this.state.ingredients} />
                <PizzaControls subtotalPrice={this.state.totalPrice} ingredients={this.state.ingredients} incredientClick={this.addIngredientHandler} orderBtnClicked={this.orderHandler} />
            </Auxiliary>)
            orderSummary = !this.state.orderPurchased ? <OrderSummary subtotalPrice={this.state.totalPrice} continueBtnClick={this.continueBtnOrderHandler} cancelBtnClick={this.closeBackdropHandler} ingredients={this.state.ingredients} /> : null;
        }

        if (this.state.loading) {
            orderSummary = <Spinner />;
        }

        return (
            <Auxiliary>
                <Modal closeBackdropHandler={this.closeBackdropHandler} show={this.state.purchasing}>
                    {orderSummary}
                </Modal>
                {pizza}
            </Auxiliary>
        );
    }
}

export default withErrorHandling(PizzaMaker, axios);