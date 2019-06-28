import reducer from './auth';
import * as actionTypes from '../actions/actionTypes';

describe('auth reducer', () => {
    it('should send me the original state', () => {
        expect(reducer(undefined, {})).toEqual({
            token: null,
            userId: null,
            loading: false,
            error: null
        })
    })
    it('should log in user in on login', () => {
        expect(reducer({
            token: null,
            userId: null,
            loading: false,
            error: null
        }, {
            type: actionTypes.AUTH_SUCCESS,
            data: {
                idToken: 'some token',
                localId: 'some userId'
            }
        })).toEqual({
            token: 'some token',
            userId: 'some userId',
            loading: false,
            error: null
        })
    })
})