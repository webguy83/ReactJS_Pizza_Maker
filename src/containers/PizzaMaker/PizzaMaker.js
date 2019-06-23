import React, { Component } from 'react';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import withErrorHandling from '../../hoc/withErrorHandling/withErrorHandling';

import axios from '../../orders-axios';

import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

import OrderSummary from '../../components/Pizza/OrderSummary/OrderSummary';
import Modal from '../../components/UI/Modal/Modal';
import Pizza from '../../components/Pizza/Pizza';
import PizzaControls from '../../components/Pizza/PizzaControls/PizzaControls';

import Spinner from '../../components/UI/Spinner/Spinner';

class PizzaMaker extends Component {

    state = {
        purchasing: false,
        orderPurchased: false
    }

    componentDidMount() {
        const { initIngredients, purchaseInit } = this.props;
        initIngredients();
        purchaseInit();
    }

    addIngredientHandler = (type) => {
        const { ingredients, toggleIngredient } = this.props;
        const newIngIndex = ingredients.findIndex(ing => { // find the ingredient item to add or remove
            return ing.type === type;
        });
        toggleIngredient(newIngIndex);
    }

    orderHandler = () => {
        this.setState({ purchasing: true, orderPurchased: false });
    }

    closeBackdropHandler = () => {
        this.setState({ purchasing: false });
    }

    continueBtnOrderHandler = () => {
        this.props.history.push({
            pathname: '/checkout'
        });
    }

    render() {
        const { ingredients, totalPrice, errorLoadingIngredients } = this.props;
        const { orderPurchased, purchasing } = this.state;
        const { closeBackdropHandler, addIngredientHandler, continueBtnOrderHandler, orderHandler } = this;
        let orderSummary = null;
        let pizza = errorLoadingIngredients ? <p style={{ color: "red", textTransform: "uppercase", fontSize: "3.3rem" }}>Sorry the ingredients failed to load for you. Contact me asap! Arghhhh.</p> : <Spinner />;

        if (ingredients) {
            pizza =
                (<Auxiliary>
                    <Pizza ingredients={ingredients} />
                    <PizzaControls subtotalPrice={totalPrice}
                        ingredients={ingredients}
                        incredientClick={addIngredientHandler}
                        orderBtnClicked={orderHandler}
                    />
                </Auxiliary>)
            orderSummary = !orderPurchased ?
                <OrderSummary subtotalPrice={totalPrice}
                    continueBtnClick={continueBtnOrderHandler}
                    cancelBtnClick={closeBackdropHandler}
                    ingredients={ingredients}
                /> : null;
        }
        return (
            <Auxiliary>
                <Modal closeBackdropHandler={closeBackdropHandler} show={purchasing}>
                    {orderSummary}
                </Modal>
                {pizza}
            </Auxiliary>
        );
    }
}

const mapStateToProps = (state) => {
    const { ingredients, totalPrice } = state.pizzaMaker;
    const { errorLoadingIngredients } = state.order;
    return {
        ingredients,
        totalPrice,
        errorLoadingIngredients
    }
}

const mapDispatchToProps = (dispatch) => {
    const { toggleIngredient, initIntredients, purchaseInit } = actions;
    return {
        toggleIngredient: (ingredientIndex) => {
            return dispatch(toggleIngredient(ingredientIndex))
        },
        initIngredients: () => {
            return dispatch(initIntredients());
        },
        purchaseInit: () => {
            return dispatch(purchaseInit());
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandling(PizzaMaker, axios));