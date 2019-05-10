import React, { Component } from 'react';
import Aux from '../../hoc/Aux';

import Pizza from '../../components/Pizza/Pizza';

class PizzaMaker extends Component {
    render() {
        return (
            <Aux>
                <Pizza />
                <p>Pizza Controls</p>
            </Aux>
        );
    }
}

export default PizzaMaker;