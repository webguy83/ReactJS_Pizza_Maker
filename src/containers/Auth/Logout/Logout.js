import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../../store/actions/index';

import { Redirect } from 'react-router-dom';

class Logout extends Component {

    componentDidMount() {
        this.props.authLogout();
    }

    render() {
        return (
            <Redirect to="/" />
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        authLogout: () => {
            return dispatch(actions.authLogout())
        }
    }
}

export default connect(null, mapDispatchToProps)(Logout);