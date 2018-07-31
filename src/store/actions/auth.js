import * as actionTypes from './actionTypes';

import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/',
});

const API_KEY = 'AIzaSyCd__BHSnz6WYSWfOvvl1etygLU8R-Z_PM';

const authSuccess = (data) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        payload: {
            data: data
        }
    }
};

const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
};

const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        payload:{
            error: error
        }
    }
};

export const signup = (email, password) => {
    return dispatch => {
        dispatch(authStart());
        const data = {
            email: email,
            password: password,
            returnSecureToken: true
        };
        instance.post(`signupNewUser?key=${API_KEY}`, data).then(response => {
            console.log(response.data);
            dispatch(authSuccess(response.data))
        }).catch(error => {
            console.log(error);
            dispatch(authFail(error));
        });
    }
};

export const signin = (email, password) => {
    return dispatch => {
        dispatch(authStart());
        const data = {
            email: email,
            password: password,
            returnSecureToken: true
        };
        instance.post(`verifyPassword?key=${API_KEY}`, data).then(response => {
            console.log(response.data);
            dispatch(authSuccess(response.data))
        }).catch(error => {
            console.log(error);
            dispatch(authFail(error));
        });
    }
};