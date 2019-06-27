import React, { Component } from 'react';

export default (importedComponent) => {
    return class extends Component {

        state = {
            component: null
        }

        componentDidMount() {
            importedComponent()
                .then(comp => {
                    this.setState({
                        component: comp.default
                    })
                })
        }

        render() {
            const C = this.state.component;
            return (
                C ? <C {...this.props} /> : null
            );
        }
    }
}