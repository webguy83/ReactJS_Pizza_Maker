import React from 'react';
import styles from './Order.module.css';

import Auxiliary from '../../hoc/Auxiliary/Auxiliary';

const Order = (props) => {
    const { orderId, ingredients, totalPrice, customerAddress, customerName, customerPostalCode, customerComments } = props;
    const adjustedIngredients = ingredients ? ingredients.map((ing, i) => {
        return <li key={i}>{ing}</li>
    }) : null
    return (
        <div className={styles.Order}>
            <h3>Order #: {orderId}</h3>
            <address>
                <p>{customerName}</p>
                <p>{customerAddress}</p>
                <p>{customerPostalCode}</p>
            </address>
            <div className={styles.ingredientsBlock}>
                {adjustedIngredients ? <Auxiliary>
                    <p>Ingredients chosen:</p>
                    <ul>
                        {adjustedIngredients}
                    </ul>
                </Auxiliary> : <p>This is a plain ass cheese pizza with no ingredients.</p>}
            </div>
            <p>Total Price: <strong>{totalPrice}</strong></p>
            <p>{customerComments}</p>
        </div>
    );
};

export default Order;