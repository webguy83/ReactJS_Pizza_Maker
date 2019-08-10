import React from 'react';

import PropTypes from 'prop-types';

import pepperoniStyles from './Pepperoni.module.css';
import mushroomStyles from './Mushroom.module.css';
import pineappleStyles from './Pineapple.module.css';
import veggieStyles from './Veggie.module.css';
import oliveStyles from './Olive.module.css';

const PizzaIngredient = (props) => {

    // render html for all the ingredients to be used, special case for mushrooms as they have slightly different HTML
    const renderIngredients = (name, styles, numOfIngredients) => {
        let result = [];
        for (let i = 1; i <= numOfIngredients; i++) {
            let html = <div key={i} className={styles[name + i]}>
                {name === "mushroom" ? <><div className={mushroomStyles.mushroomCup}></div><div className={mushroomStyles.mushroomStem}></div></> : null}
            </div>;
            result.push(html);
        }
        return (
            <>
                {result}
            </>
        )
    }

    let ingredient = undefined;
    switch (props.type) {
        case "pepperoni":
            ingredient = (
                renderIngredients("pepperoni", pepperoniStyles, 10)
            );
            break;
        case "mushroom":
            ingredient = (
                renderIngredients("mushroom", mushroomStyles, 10)
            );
            break;
        case "pineapple":
            ingredient = (
                renderIngredients("pineapple", pineappleStyles, 10)
            );
            break;
        case "veggie":
            ingredient = (
                renderIngredients("veggie", veggieStyles, 10)
            );
            break;
        case "olive":
            ingredient = (
                renderIngredients("olive", oliveStyles, 10)
            );
            break;
        default:
            ingredient = undefined;
            break;
    }
    return ingredient;

};

PizzaIngredient.propTypes = {
    type: PropTypes.string.isRequired
}

export default PizzaIngredient;