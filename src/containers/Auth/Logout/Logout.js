import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../../store/actions/index';

import { Redirect } from 'react-router-dom';

const Logout = (props) => {

    useEffect(() => {
        props.authLogout();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Redirect to="/" />
    );

}

const mapDispatchToProps = (dispatch) => {
    return {
        authLogout: () => {
            return dispatch(actions.authLogout())
        }
    }
}

export default connect(null, mapDispatchToProps)(Logout);