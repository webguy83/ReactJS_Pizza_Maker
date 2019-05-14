import React from 'react';
import Auxilary from '../../../hoc/Auxiliary';

const OrderSummary = (props) => {
    const filteredIngredients = props.ingredients.filter(ing => {
        return ing.purchased;
    }).map(ing => {
        return <li style={{textTransform: "capitalize"}} key={ing.type}>{ing.type}</li>
    })
    
    return (
        <Auxilary>
            <h3>Order Summary</h3>
            <p>You currently have ordered <strong>{filteredIngredients.length}</strong> ingredients to go along with your base pizza with cheese.</p>
            <ul>
                {filteredIngredients}
            </ul>
            <p>Are you all good to checkout and eat some tasty pizza?</p>
        </Auxilary>
    );
};

export default OrderSummary;