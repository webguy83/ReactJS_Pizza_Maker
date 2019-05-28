import React, { Component } from 'react';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';

import OrderSummary from '../../components/Pizza/OrderSummary/OrderSummary';
import Modal from '../../components/UI/Modal/Modal';
import Pizza from '../../components/Pizza/Pizza';
import PizzaControls from '../../components/Pizza/PizzaControls/PizzaControls';

class PizzaMaker extends Component {

    ingredients = ["pepperoni", "mushroom", "veggie", "pineapple", "olive"];
    ingredientPrice = 0.99;

    state = {
        ingredients: this.ingredients.map(ing => { // convert ingredients array to an object form with type and purchased as keys
            return {
                type: ing,
                purchased: false
            }
        }),
        totalPrice: 5.99,
        purchasing: false
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
        this.setState({ purchasing: true });
    }

    closeBackdropHandler = () => {
        this.setState({ purchasing: false });
    }

    continueBtnOrderHandler = () => {
        alert("This will send data to the DB in the future :)")
    }

    render() {
        return (
            <Auxiliary>
                <Modal closeBackdropHandler={this.closeBackdropHandler} show={this.state.purchasing}>
                    <OrderSummary subtotalPrice={this.state.totalPrice} continueBtnClick={this.continueBtnOrderHandler} cancelBtnClick={this.closeBackdropHandler} ingredients={this.state.ingredients} />
                </Modal>
                {<Pizza ingredients={this.state.ingredients} />}
                <PizzaControls subtotalPrice={this.state.totalPrice} ingredients={this.state.ingredients} incredientClick={this.addIngredientHandler} orderBtnClicked={this.orderHandler} />
            </Auxiliary>
        );
    }
}

export default PizzaMaker;