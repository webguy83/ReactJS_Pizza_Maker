import React, { Component } from 'react';

import PropTypes from 'prop-types';

import Auxiliary from '../../../hoc/Auxiliary';
import pepperoniStyles from './Pepperoni.module.css';
import mushroomStyles from './Mushroom.module.css';
import pineappleStyles from './Pineapple.module.css';
import veggieStyles from './Veggie.module.css';
import oliveStyles from './Olive.module.css';

class PizzaIngredient extends Component {
    render() {
        let ingredient = undefined;
        switch (this.props.type) {
            case "pepperoni":
                ingredient = (<Auxiliary>
                    <div className={pepperoniStyles.pepperoni1}></div>
                    <div className={pepperoniStyles.pepperoni2}></div>
                    <div className={pepperoniStyles.pepperoni3}></div>
                    <div className={pepperoniStyles.pepperoni4}></div>
                    <div className={pepperoniStyles.pepperoni5}></div>
                    <div className={pepperoniStyles.pepperoni6}></div>
                    <div className={pepperoniStyles.pepperoni7}></div>
                    <div className={pepperoniStyles.pepperoni8}></div>
                    <div className={pepperoniStyles.pepperoni9}></div>
                    <div className={pepperoniStyles.pepperoni10}></div>
                </Auxiliary>
                );
                break;
            case "mushroom":
                ingredient = (<Auxiliary>
                    <div className={mushroomStyles.mushroom1}>
                        <div className={mushroomStyles.mushroomCup}></div>
                        <div className={mushroomStyles.mushroomStem}></div>
                    </div>
                    <div className={mushroomStyles.mushroom2}>
                        <div className={mushroomStyles.mushroomCup}></div>
                        <div className={mushroomStyles.mushroomStem}></div>
                    </div>
                    <div className={mushroomStyles.mushroom3}>
                        <div className={mushroomStyles.mushroomCup}></div>
                        <div className={mushroomStyles.mushroomStem}></div>
                    </div>
                    <div className={mushroomStyles.mushroom4}>
                        <div className={mushroomStyles.mushroomCup}></div>
                        <div className={mushroomStyles.mushroomStem}></div>
                    </div>
                    <div className={mushroomStyles.mushroom5}>
                        <div className={mushroomStyles.mushroomCup}></div>
                        <div className={mushroomStyles.mushroomStem}></div>
                    </div>
                    <div className={mushroomStyles.mushroom6}>
                        <div className={mushroomStyles.mushroomCup}></div>
                        <div className={mushroomStyles.mushroomStem}></div>
                    </div>
                    <div className={mushroomStyles.mushroom7}>
                        <div className={mushroomStyles.mushroomCup}></div>
                        <div className={mushroomStyles.mushroomStem}></div>
                    </div>
                    <div className={mushroomStyles.mushroom8}>
                        <div className={mushroomStyles.mushroomCup}></div>
                        <div className={mushroomStyles.mushroomStem}></div>
                    </div>
                    <div className={mushroomStyles.mushroom9}>
                        <div className={mushroomStyles.mushroomCup}></div>
                        <div className={mushroomStyles.mushroomStem}></div>
                    </div>
                </Auxiliary>
                );
                break;
            case "pineapple":
                ingredient = (<Auxiliary>
                    <div className={pineappleStyles.pineapple1}></div>
                    <div className={pineappleStyles.pineapple2}></div>
                    <div className={pineappleStyles.pineapple3}></div>
                    <div className={pineappleStyles.pineapple4}></div>
                    <div className={pineappleStyles.pineapple5}></div>
                    <div className={pineappleStyles.pineapple6}></div>
                    <div className={pineappleStyles.pineapple7}></div>
                    <div className={pineappleStyles.pineapple8}></div>
                    <div className={pineappleStyles.pineapple9}></div>
                    <div className={pineappleStyles.pineapple10}></div>
                </Auxiliary>
                );
                break;
            case "veggie":
                ingredient = (<Auxiliary>
                    <div className={veggieStyles.veggie1}></div>
                    <div className={veggieStyles.veggie2}></div>
                    <div className={veggieStyles.veggie3}></div>
                    <div className={veggieStyles.veggie4}></div>
                    <div className={veggieStyles.veggie5}></div>
                    <div className={veggieStyles.veggie6}></div>
                    <div className={veggieStyles.veggie7}></div>
                    <div className={veggieStyles.veggie8}></div>
                    <div className={veggieStyles.veggie9}></div>
                    <div className={veggieStyles.veggie10}></div>
                </Auxiliary>
                );
                break;
            case "olive":
                ingredient = (<Auxiliary>
                    <div className={oliveStyles.olive1}></div>
                    <div className={oliveStyles.olive2}></div>
                    <div className={oliveStyles.olive3}></div>
                    <div className={oliveStyles.olive4}></div>
                    <div className={oliveStyles.olive5}></div>
                    <div className={oliveStyles.olive6}></div>
                    <div className={oliveStyles.olive7}></div>
                    <div className={oliveStyles.olive8}></div>
                    <div className={oliveStyles.olive9}></div>
                    <div className={oliveStyles.olive10}></div>
                </Auxiliary>
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