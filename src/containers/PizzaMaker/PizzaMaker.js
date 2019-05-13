import React, { Component } from 'react';
import Auxiliary from '../../hoc/Auxiliary';

import Pizza from '../../components/Pizza/Pizza';
import PizzaControls from '../../components/Pizza/PizzaControls/PizzaControls';

class PizzaMaker extends Component {

    ingredients = ["pepperoni", "mushroom", "veggie", "pineapple", "olive"];
    ingredientPrice = 0.99;

    state = {
        ingredients: this.ingredients.map(ing => {
            return {
                type: ing,
                purchased: false
            }
        }),
        totalPrice: 5.99
    }

    addIngredientHandler = (type) => {
        const newIngredients = [...this.state.ingredients];
        const newIngIndex = newIngredients.findIndex(ing => {
            return ing.type === type;
        });

        newIngredients[newIngIndex].purchased = !newIngredients[newIngIndex].purchased;

        this.setState({
            ingredients: newIngredients,
            totalPrice: newIngredients[newIngIndex].purchased ? this.state.totalPrice + this.ingredientPrice : this.state.totalPrice - this.ingredientPrice
        })
    }

    render() {
        console.log("$"+this.state.totalPrice.toFixed(2))
        return (
            <Auxiliary>
                <PizzaControls subtotalPrice={this.state.totalPrice} ingredients={this.state.ingredients} incredientClick={this.addIngredientHandler} />
                {<Pizza ingredients={this.state.ingredients} />}
            </Auxiliary>
        );
    }
}

export default PizzaMaker;