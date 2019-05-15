import React from 'react';
import Auxilary from '../../../hoc/Auxiliary';

import GenericButton from '../../UI/GenericButton/GenericButton';

const OrderSummary = (props) => {
    const { subtotalPrice, ingredients, cancelBtnClick, continueBtnClick } = props;
    const grandTotalPrice = subtotalPrice + (subtotalPrice * .12);

    const filteredIngredients = ingredients.filter(ing => {
        return ing.purchased;
    }).map(ing => {
        return <li style={{ textTransform: "capitalize" }} key={ing.type}>{ing.type}</li>
    })

    return (
        <Auxilary>
            <h3>Order Summary</h3>
            <p>You currently have ordered <strong>{filteredIngredients.length}</strong> ingredients to go along with your base pizza with cheese.</p>
            <ul>
                {filteredIngredients}
            </ul>
            <p>Are you all good to checkout and eat some tasty pizza for only <strong>${grandTotalPrice.toFixed(2)}</strong>?</p>
            <GenericButton clicked={cancelBtnClick} btnType="Failure">Cancel</GenericButton>
            <GenericButton clicked={continueBtnClick} btnType="Success">Continue</GenericButton>
        </Auxilary>
    );
};

export default OrderSummary;