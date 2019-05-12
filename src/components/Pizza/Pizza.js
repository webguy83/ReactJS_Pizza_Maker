import React from 'react';
import PizzaIngredient from './PizzaIngredient/PizzaIngredient';

import pizzaGenericStyles from './Pizza.module.css';

const Pizza = (props) => {
    const {ingredients} = props;

    const modifiedIngredients = ingredients.map(ing => {
        return <PizzaIngredient type={ing} key={ing} />
    })

    return (
        <div className={pizzaGenericStyles.plate}>
            <div className={pizzaGenericStyles.pizzaBase1}>
                <div className={pizzaGenericStyles.pizzaBase2}>
                  {modifiedIngredients}
                </div>
            </div>
            <div className={pizzaGenericStyles.handle}>
                <div className={pizzaGenericStyles.handleHole}></div>
            </div>
        </div>
    );
};

export default Pizza;