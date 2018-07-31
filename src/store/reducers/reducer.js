import * as actionTypes from '../actions/actionTypes';

const initialState = {
    ingredients: null,
    totalPrice: 4,
    error: false,
    loading: true,
    ordered: false,
    orders: null,
    authenticated: false
};


const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT: {
            const ingredients = {...state.ingredients};
            ingredients[action.payload.ingredient] += 1;
            const price = state.totalPrice + action.payload.price;
            return {
                ingredients: ingredients,
                totalPrice: price,
            }
        }
        case actionTypes.REMOVE_INGREDIENT: {
            const ingredients = {...state.ingredients};
            if (ingredients[action.payload.ingredient] > 0) {
                ingredients[action.payload.ingredient] -= 1;
                const price = state.totalPrice - action.payload.price;
                return {
                    ingredients: ingredients,
                    totalPrice: price,
                }
            }
            return state;
        }
        case actionTypes.SET_INGREDIENTS: {
            return {
                ...state,
                ingredients: action.payload.ingredients,
                totalPrice: 4,
                error: false,
                loading: false
            }
        }
        case actionTypes.FETCH_INGREDIENTS_FAILED: {
            return {
                ...state,
                error: true,
                loading: true
            }
        }
        case actionTypes.INIT_ORDERING: {
            return {
                ...state,
                loading: true,
                ordered: false
            }
        }
        case actionTypes.SUBMIT_ORDER: {
            return {
                ...state,
                loading: false,
                ordered: true
            }
        }
        case actionTypes.ORDERS_FETCHED: {
            return {
                ...state,
                orders: action.payload.orders
            }
        }
        default: {
            return state
        }
    }
};

export default reducer;