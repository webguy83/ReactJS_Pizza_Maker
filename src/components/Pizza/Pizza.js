import React from 'react';
import PizzaIngredient from './PizzaIngredient/PizzaIngredient';

import pizzaGenericStyles from './Pizza.module.css';

const Pizza = (props) => {
    const {ingredients} = props;

    const modifiedIngredients = ingredients.filter(ing => {
        return ing.purchased === true;
    }).map(ing => {
        return <PizzaIngredient type={ing.type} key={ing.type} />
    })

    return (
        <div className={pizzaGenericStyles.plate}>
            <div className={pizzaGenericStyles.pizzaBase1}>
                <div className={pizzaGenericStyles.pizzaBase2}>
                  {modifiedIngredients}
                </div>
            </div>
        </div>
    );
};

export default Pizza;