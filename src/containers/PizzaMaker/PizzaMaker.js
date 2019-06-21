import React, { Component } from 'react';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import withErrorHandling from '../../hoc/withErrorHandling/withErrorHandling';

import axios from '../../orders-axios';

import { connect } from 'react-redux';
import * as pizzaMakerActionCreators from '../../store/actions/index';

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
        if(this.props.getIngredients === null) {
            this.props.initIngredients();
        }
    }

    addIngredientHandler = (type) => {
        const newIngIndex = this.props.getIngredients.findIndex(ing => { // find the ingredient item to add or remove
            return ing.type === type;
        });
        this.props.toggleIngredient(newIngIndex);
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
        let orderSummary = null;
        let pizza = this.props.errorLoadingIngredients ? <p style={{ color: "red", textTransform: "uppercase", fontSize: "3.3rem" }}>Sorry the ingredients failed to load for you. Contact me asap! Arghhhh.</p> : <Spinner />;

        if (this.props.getIngredients) {
            pizza = (<Auxiliary>
                <Pizza ingredients={this.props.getIngredients} />
                <PizzaControls subtotalPrice={this.props.getTotalPrice} ingredients={this.props.getIngredients} incredientClick={this.addIngredientHandler} orderBtnClicked={this.orderHandler} />
            </Auxiliary>)
            orderSummary = !this.state.orderPurchased ? <OrderSummary subtotalPrice={this.props.getTotalPrice} continueBtnClick={this.continueBtnOrderHandler} cancelBtnClick={this.closeBackdropHandler} ingredients={this.props.getIngredients} /> : null;
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
        getIngredients: state.ingredients,
        getTotalPrice: state.totalPrice,
        errorLoadingIngredients: state.errorLoadingIngredients
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        toggleIngredient: (ingredientIndex) => {
            return dispatch(pizzaMakerActionCreators.toggleIngredient(ingredientIndex))
        },
        initIngredients: () => {
            return dispatch(pizzaMakerActionCreators.initIntredients());
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandling(PizzaMaker, axios));