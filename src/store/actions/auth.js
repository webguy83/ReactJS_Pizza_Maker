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
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
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
                const expirationDate = new Date(new Date().getTime() + res.data.expiresIn * 1000);
                localStorage.setItem('token', res.data.idToken);
                localStorage.setItem('expirationDate', expirationDate)
                localStorage.setItem('userId', res.data.localId)
                dispatch(authSuccess(res.data));
                dispatch(authTimeOutLogOut(res.data.expiresIn))
            })
            .catch(error => {
                dispatch(authFailed(error.response.data.error.message));
            })
    }
}

export const authCheckStatus = () => {
    return (dispatch) => {
        const token = localStorage.getItem('token');
        if(!token) {
            dispatch(authLogout());
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if(expirationDate > new Date()) {
                const userId = localStorage.getItem('userId');
                dispatch(authSuccess(token, userId));
                dispatch(authTimeOutLogOut((expirationDate.getTime() - new Date().getTime()) / 1000));
            } else {
                dispatch(authLogout());
            }
        }
    }
}