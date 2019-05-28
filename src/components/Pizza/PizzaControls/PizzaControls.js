import React from 'react';

import PizzaControl from './PizzaControl/PizzaControl';
import styles from './PizzaControls.module.css';

const PizzaControls = (props) => {
    const {subtotalPrice, ingredients, incredientClick} = props;
    const totalPriceWithTax = subtotalPrice + (subtotalPrice * .12);

    const pizzaControlElems = ingredients.map(ing => {
        const type = ing.type;
        return <PizzaControl purchased={ing.purchased} incredientClick={() => incredientClick(type)} key={type} type={type} />
    })

    return (
        <div className={styles.PizzaControls}>
            <div className={styles.pizzaControlBlock}>
            <h2 className={styles.pizzaControlsHeading}>Customize your pizza!</h2>
            <p className={styles.chooseHeading}>Choose your ingredients for only 99&cent; more!</p>
            <div className={styles.ingredientBtns}>
                {pizzaControlElems}
            </div>
            <div className={styles.cart}>
                <p className={styles.subTotalLabel}>Subtotal :</p>
                <p className={styles.subTotalPrice}><strong>${subtotalPrice.toFixed(2)} + tax</strong></p>
                <p className={styles.totalPriceLabel}>Total :</p>
                <p className={styles.totalPrice}><strong>${totalPriceWithTax.toFixed(2)}</strong></p>
            </div>
            <button onClick={props.orderBtnClicked} className={styles.orderBtn}>Order Now!</button>
            </div>
            
        </div>
    );
};

export default PizzaControls;