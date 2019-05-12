import React from 'react';

import config from '../../../utils/config';

import PizzaControl from './PizzaControl/PizzaControl';
import styles from './PizzaControls.module.css';

const PizzaControls = () => {

    const ingredients = config.ingredients;

    const pizzaControlElems = ingredients.map(ing => {
        return <PizzaControl key={ing} type={ing.slice(0, 1).toUpperCase() + ing.slice(1)} />
    })

    return (
        <div className={styles.PizzaControls}>
            <h2 className={styles.pizzaControlsHeading}>Customize your pizza!</h2>
            <p className={styles.chooseHeading}>Choose your ingredients:</p>
            <div className={styles.ingredientBtns}>
                {pizzaControlElems}
            </div>    
        </div>
    );
};

export default PizzaControls;