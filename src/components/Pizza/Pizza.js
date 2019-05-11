import React from 'react';
import PizzaIngredient from './PizzaIngredient/PizzaIngredient';

import pizzaGenericStyles from './PizzaIngredient/PizzaIngredient.module.css';

const Pizza = () => {
    return (
        <div className={pizzaGenericStyles.plate}>
            <div className={pizzaGenericStyles.pizzaBase1}>
                <div className={pizzaGenericStyles.pizzaBase2}>
                    <PizzaIngredient type="pepperoni" />
                    <PizzaIngredient type="veggie" />
                    <PizzaIngredient type="pineapple" />
                    <PizzaIngredient type="mushroom" />
                    <PizzaIngredient type="olives" />
                </div>
            </div>
            <div className={pizzaGenericStyles.handle}>
                <div className={pizzaGenericStyles.handleHole}></div>
            </div>
        </div>
    );
};

export default Pizza;