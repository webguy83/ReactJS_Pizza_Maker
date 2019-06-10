import React from 'react';
import styles from './CheckoutSummary.module.css';

import Pizza from '../../Pizza/Pizza';
import GenericButton from '../../UI/GenericButton/GenericButton';

const CheckoutSummary = (props) => {

    const { ingredients, continueClicked, cancelClicked } = props;
    const newIngredients = ingredients.map(ing => {
        return {
            type: ing,
            purchased: true
        }
    });

    return (
        <div className={styles.CheckoutSummary}>
            <h1>Let's hope you love my homemade pizza!</h1>
            <Pizza ingredients={newIngredients} />
            <div>
                <GenericButton btnType="Success" clicked={continueClicked}>Continue to Buy</GenericButton>
                <GenericButton btnType="Failure" clicked={cancelClicked}>Cancel Your Order</GenericButton>
            </div>
        </div>
    );
};

export default CheckoutSummary;