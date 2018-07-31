import * as actionTypes from './actionTypes';

import axios from '../../axios-orders';
import {fetchIngredientsFailed, setIngredients} from "./burgerBuilder";

const completeOrdering = () => {
    return {
        type: actionTypes.SUBMIT_ORDER
    }
};

const orderingFailed = () => {
    return {
        type: actionTypes.ORDERING_FAILED
    }
};

export const initOrdering = () => {
    return {
        type: actionTypes.INIT_ORDERING
    }
};

export const submitOrder = (data) => {
    return dispatch => {
        dispatch(initOrdering());
        axios.post('/order.json', data).then(response => {
            dispatch(completeOrdering())
        }).catch(error => {
            dispatch(orderingFailed());
        });
    }
};

const ordersFetched = (orders) => {
    return{
        type: actionTypes.ORDERS_FETCHED,
        payload: {
            orders: orders
        }
    }
};

export const fetchOrders = () => {
    return dispatch => {
        axios.get('order.json').then(response => {
            let orders = [];
            for (let item in response.data) {
                const rowItem = response.data[item];
                orders.push({
                    customer: rowItem.customer,
                    deliveryMethod: rowItem.deliveryMethod,
                    ingredients: rowItem.ingredients,
                    price: rowItem.price,
                    purchaseDate: rowItem.purchaseDate,
                    id: item
                });
            }
            dispatch(ordersFetched(orders));
        }).catch(error => {
            console.log(error);
        })
    }
};