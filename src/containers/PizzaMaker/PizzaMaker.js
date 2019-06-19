import React, { Component } from 'react';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import withErrorHandling from '../../hoc/withErrorHandling/withErrorHandling';

import axios from '../../orders-axios';

import { connect } from 'react-redux';
import * as actionTypes from '../../store/actions';

import OrderSummary from '../../components/Pizza/OrderSummary/OrderSummary';
import Modal from '../../components/UI/Modal/Modal';
import Pizza from '../../components/Pizza/Pizza';
import PizzaControls from '../../components/Pizza/PizzaControls/PizzaControls';

import Spinner from '../../components/UI/Spinner/Spinner';

class PizzaMaker extends Component {

    state = {
        purchasing: false,
        orderPurchased: false,
        loading: false,
        error: false
    }

    componentDidMount() {
        // this.props.alterIngredients(null);
        // this.props.totalPrice(5.99);
        axios.get('/ingredients.json')
            .then(res => {
                const ingredients = res.data.map(ing => { // convert ingredients array to an object form with type and purchased as keys
                    return {
                        type: ing,
                        purchased: false
                    }
                });
                
                this.props.alterIngredients(ingredients);
            })
            .catch(() => {
                this.setState({
                    error: true
                })
            })
    }

    addIngredientHandler = (type) => {
        const newIngredients = [...this.props.ingredients]; // copy ingredients from state
        const newIngIndex = newIngredients.findIndex(ing => { // find the ingredient item to add or remove
            return ing.type === type;
        });

        newIngredients[newIngIndex].purchased = !newIngredients[newIngIndex].purchased; // add or remove the ingredient from the cart
        this.props.alterIngredients(newIngredients);
        newIngredients[newIngIndex].purchased ? this.props.totalPrice(this.props.getTotalPrice + this.props.getIngredientPrice) : this.props.totalPrice(this.props.getTotalPrice - this.props.getIngredientPrice); //if incredient is purchased then add to the subtotal price otherwise deduct it from the total
    }

    orderHandler = () => {
        this.setState({ purchasing: true, orderPurchased: false });
    }

    closeBackdropHandler = () => {
        this.setState({ purchasing: false });
    }

    continueBtnOrderHandler = () => {
        // const purchasedIngredients = this.props.ingredients.filter(ing => {
        //     return ing.purchased === true;
        // }).map(ing => {
        //     return ing.type;
        // })
        // this.props.alterIngredients(purchasedIngredients);

        this.props.history.push({
            pathname: '/checkout'
        });
    }

    render() {
        let orderSummary = null;
        let pizza = this.state.error ? <p style={{ color: "red", textTransform: "uppercase", fontSize: "3.3rem" }}>Sorry the ingredients failed to load for you. Contact me asap! Arghhhh.</p> : <Spinner />;
        
        if (this.props.ingredients) {
            pizza = (<Auxiliary>
                <Pizza ingredients={this.props.ingredients} />
                <PizzaControls subtotalPrice={this.props.getTotalPrice} ingredients={this.props.ingredients} incredientClick={this.addIngredientHandler} orderBtnClicked={this.orderHandler} />
            </Auxiliary>)
            orderSummary = !this.state.orderPurchased ? <OrderSummary subtotalPrice={this.props.getTotalPrice} continueBtnClick={this.continueBtnOrderHandler} cancelBtnClick={this.closeBackdropHandler} ingredients={this.props.ingredients} /> : null;
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

const mapStateToProps = (state) => {
    return {
        ingredients: state.ingredients,
        getTotalPrice: state.totalPrice,
        getIngredientPrice: state.ingredientPrice
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        alterIngredients: (ingredients) => {
            return dispatch({type: actionTypes.INGREDIENTS, defaultIngredients: ingredients})
        },
        totalPrice: (tPrice) => {
            return dispatch({type: actionTypes.TOTAL_PRICE, totalPrice: tPrice})
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandling(PizzaMaker, axios));