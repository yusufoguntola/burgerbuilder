import * as actionTypes from './actionTypes';

import axios from '../../axios-orders';


//These guys are action creators

export const addIngredient = action => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        payload: action.payload
    }
};

export const removeIngredient = action => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        payload: action.payload
    }
};

export const setIngredients = ingredients => {
    return {
        type: actionTypes.SET_INGREDIENTS,
        payload: {
            ingredients: ingredients
        }
    }
};

export const fetchIngredientsFailed = () => {
    return {
        type: actionTypes.FETCH_INGREDIENTS_FAILED
    }
};


export const initializeIngredients = () => {
    return dispatch => {
        axios.get('ingredients.json').then(response => {
            dispatch(setIngredients(response.data));
        }).catch(error => {
            console.log(error);
            dispatch(fetchIngredientsFailed());
        })
    }
};