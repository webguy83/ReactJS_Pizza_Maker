import * as actionTypes from './actionTypes';
import { API_KEY } from '../../private';
import axios from 'axios';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const authSuccess = (data) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        data
    }
}

export const authFailed = (errorMessage) => {
    return {
        type: actionTypes.AUTH_FAILED,
        errorMessage
    }
}

export const authLogout = () => {
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

export const authTimeOutLogOut = (logOutTimer) => {
    return (dispatch) => {
        setTimeout(() => {
            dispatch(authLogout());
        },
            logOutTimer * 1000);
    }
}

export const auth = (email, password, signInMode) => {
    return (dispatch) => {
        dispatch(authStart());
        const userData = {
            email,
            password,
            returnSecureToken: true
        }
        const url = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/${signInMode ? "verifyPassword" : "signupNewUser"}?key=${API_KEY}`;
        axios.post(url, userData)
            .then(res => {
                dispatch(authSuccess(res.data));
                dispatch(authTimeOutLogOut(res.data.expiresIn))
            })
            .catch(error => {
                dispatch(authFailed(error.response.data.error.message));
            })
    }
}