import * as actionTypes from '../../store/actions/actionTypes';
import { updateObjState } from '../../utils/utility';

const initState = {
    token: null,
    userId: null,
    loading: false,
    error: null
}

const authStart = (state) => {
    return updateObjState(state, {
        loading: true,
        error: null
    });
}

const authSuccess = (state, action) => {
    const { localId, idToken } = action.data;
    return updateObjState(state, {
        userId: localId,
        token: idToken,
        loading: false
    })
}

const authFailed = (state, action) => {
    return updateObjState(state, {
        error: action.errorMessage,
        loading: false
    })
}

const authLogOut = (state) => {
    return updateObjState(state, {
        token: null,
        userId: null
    })
}

const reducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_START: return authStart(state)
        case actionTypes.AUTH_SUCCESS: return authSuccess(state, action)
        case actionTypes.AUTH_FAILED: return authFailed(state, action)
        case actionTypes.AUTH_LOGOUT: return authLogOut(state)
        default: return state;
    }
}

export default reducer;