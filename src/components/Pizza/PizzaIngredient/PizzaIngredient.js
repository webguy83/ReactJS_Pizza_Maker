import React, { Component } from 'react';

import PropTypes from 'prop-types';

import Auxiliary from '../../../hoc/Auxiliary/Auxiliary';
import pepperoniStyles from './Pepperoni.module.css';
import mushroomStyles from './Mushroom.module.css';
import pineappleStyles from './Pineapple.module.css';
import veggieStyles from './Veggie.module.css';
import oliveStyles from './Olive.module.css';

class PizzaIngredient extends Component {
    
    // render html for all the ingredients to be used, special case for mushrooms as they have slightly different HTML
    renderIngredients = (name, styles, numOfIngredients) => {
        let result = [];
        for(let i = 1; i <= numOfIngredients; i++) {
            let html = <div key={i} className={styles[name+i]}>
                {name === "mushroom" ? <Auxiliary><div className={mushroomStyles.mushroomCup}></div><div className={mushroomStyles.mushroomStem}></div></Auxiliary> : null}
            </div>;
            result.push(html);
        }
        return (
            <Auxiliary>
                {result}
            </Auxiliary>
        )
    }

    render() {
        let ingredient = undefined;
        switch (this.props.type) {
            case "pepperoni":
                ingredient = (
                    this.renderIngredients("pepperoni", pepperoniStyles, 10)
                );
                break;
            case "mushroom":
                ingredient = (
                    this.renderIngredients("mushroom", mushroomStyles, 10)
                );
                break;
            case "pineapple":
                ingredient = (
                    this.renderIngredients("pineapple", pineappleStyles, 10)
                );
                break;
            case "veggie":
                ingredient = (
                    this.renderIngredients("veggie", veggieStyles, 10)
                );
                break;
            case "olive":
                ingredient = (
                    this.renderIngredients("olive", oliveStyles, 10)
                );
                break;
            default:
                ingredient = undefined;
                break;
        }
        return ingredient;
    }
};

PizzaIngredient.propTypes = {
    type: PropTypes.string.isRequired
}

export default PizzaIngredient;