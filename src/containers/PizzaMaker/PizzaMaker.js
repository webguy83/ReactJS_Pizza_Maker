import React, { useState, useEffect } from 'react';
import withErrorHandling from '../../hoc/withErrorHandling/withErrorHandling';

import axios from '../../orders-axios';

import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

import OrderSummary from '../../components/Pizza/OrderSummary/OrderSummary';
import Modal from '../../components/UI/Modal/Modal';
import Pizza from '../../components/Pizza/Pizza';
import PizzaControls from '../../components/Pizza/PizzaControls/PizzaControls';

import Spinner from '../../components/UI/Spinner/Spinner';

const PizzaMaker = (props) => {

    const [orderPurchased, setOrderPurchased] = useState(false);
    const { initIngredients, purchaseInit, buyPizzaPurchasing, ingredients, totalPrice, errorLoadingIngredients, isAuthenticated, purchasingPizza } = props;

    let orderSummary = null;
    let pizza = errorLoadingIngredients ? <p style={{ color: "red", textTransform: "uppercase", fontSize: "3.3rem" }}>Sorry the ingredients failed to load for you. Contact me asap! Arghhhh.</p> : <Spinner />;

    useEffect(() => {
        buyPizzaPurchasing(false);
        initIngredients();
        purchaseInit();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const addIngredientHandler = (type) => {
        const { toggleIngredient } = props;
        const newIngIndex = ingredients.findIndex(ing => { // find the ingredient item to add or remove
            return ing.type === type;
        });
        toggleIngredient(newIngIndex);
    }

    const orderHandler = () => {
        buyPizzaPurchasing(true)
        if (props.isAuthenticated) {
            setOrderPurchased(false);
        } else {
            props.history.push("/auth");
        }
    }

    const closeBackdropHandler = () => {
        buyPizzaPurchasing(false)
    }

    const continueBtnOrderHandler = () => {
        props.history.push({
            pathname: '/checkout'
        });
    }

    if (ingredients) {
        pizza =
            (<>
                <Pizza ingredients={ingredients} />
                <PizzaControls subtotalPrice={totalPrice}
                    ingredients={ingredients}
                    incredientClick={addIngredientHandler}
                    orderBtnClicked={orderHandler}
                    isAuth={isAuthenticated}
                />
            </>)
        orderSummary = !orderPurchased ?
            <OrderSummary subtotalPrice={totalPrice}
                continueBtnClick={continueBtnOrderHandler}
                cancelBtnClick={closeBackdropHandler}
                ingredients={ingredients}
            /> : null;
    }
    return (
        <>
            <Modal closeBackdropHandler={closeBackdropHandler} show={purchasingPizza}>
                {orderSummary}
            </Modal>
            {pizza}
        </>
    );

}

const mapStateToProps = (state) => {
    const { totalPrice, purchasingPizza, ingredients } = state.pizzaMaker;
    const { errorLoadingIngredients } = state.order;
    const { token } = state.auth;
    return {
        ingredients,
        totalPrice,
        errorLoadingIngredients,
        purchasingPizza,
        isAuthenticated: token !== null
    }
}

const mapDispatchToProps = (dispatch) => {
    const { toggleIngredient, initIntredients, purchaseInit, buyPizzaPurchasing } = actions;
    return {
        toggleIngredient: (ingredientIndex) => {
            return dispatch(toggleIngredient(ingredientIndex))
        },
        initIngredients: () => {
            return dispatch(initIntredients());
        },
        purchaseInit: () => {
            return dispatch(purchaseInit());
        },
        buyPizzaPurchasing: (purchasing) => {
            return dispatch(buyPizzaPurchasing(purchasing))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandling(PizzaMaker, axios));