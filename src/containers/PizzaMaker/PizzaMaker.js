import React, { Component } from 'react';
import Auxiliary from '../../hoc/Auxiliary';

import config from '../../utils/config';

import Pizza from '../../components/Pizza/Pizza';
import PizzaControls from '../../components/Pizza/PizzaControls/PizzaControls';

class PizzaMaker extends Component {

    state = {
        ingredients: config.ingredients
    }

    render() {
        return (
            <Auxiliary>
                <PizzaControls />
                <Pizza ingredients={this.state.ingredients} />
            </Auxiliary>
        );
    }
}

export default PizzaMaker;