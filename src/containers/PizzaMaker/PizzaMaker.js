import React, { Component } from 'react';
import Auxiliary from '../../hoc/Auxiliary';

import Pizza from '../../components/Pizza/Pizza';

class PizzaMaker extends Component {
    render() {
        return (
            <Auxiliary>
                <Pizza />
                <p>Pizza Controls</p>
            </Auxiliary>
        );
    }
}

export default PizzaMaker;