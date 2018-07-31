import React, {Component} from 'react';

import Aux from '../../hoc/Auxiliary';

import Burger from '../../components/Burger/Burger';
import axios from '../../axios-orders';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import SuccessIcon from '../../components/UI/SuccessIcon/SuccessIcon';

import * as actions from '../../store/actions/index';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';


import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENT_PRICES = {
    meat: 1.5,
    salad: 0.8,
    cheese: 0.3,
    bacon: 0.6
};

class BurgerBuilder extends Component {
    state = {
        purchasing: false,
        purchased: false
    };

    activateOrderBtn() {
        const ingredients = this.props.ingredients;
        const sum = Object.keys(ingredients).map(key => {
            return ingredients[key];
        }).reduce((prev, curr) => {
            return prev + curr;
        }, 0);
        return sum > 0;
    }

    startPurchasing = () => {
        this.setState({purchasing: true});
    };

    cancelPurchase = () => {
        this.setState({purchasing: false, purchased: false});
    };

    proceedToCheckout = () => {
        // let queryParams = [];
        // for (let i in this.props.ingredients) {
        //     queryParams.push(`${encodeURIComponent(i)}=${encodeURIComponent(this.props.ingredients[i])}`);
        // }
        // queryParams.push('price=' + this.props.totalPrice);
        // const queryString = queryParams.join('&');
        // this.props.history.push({
        //     pathname: '/checkout',
        //     query: '?' + queryString
        // });
        this.props.history.push('/checkout');
    };

    // addIngredient = (type) => {
    //     let ingredients = {...this.state.ingredients};
    //     ingredients[type] += 1;
    //     const price = this.state.totalPrice + INGREDIENT_PRICES[type];
    //     this.setState({ingredients: ingredients, totalPrice: price});
    //     this.updatePurchasable(ingredients);
    // };
    //
    // removeIngredient = (type) => {
    //     let ingredients = {...this.state.ingredients};
    //     if (ingredients[type] > 0) {
    //         ingredients[type] -= 1;
    //         const price = this.state.totalPrice - INGREDIENT_PRICES[type];
    //         this.setState({ingredients: ingredients, totalPrice: price});
    //         this.updatePurchasable(ingredients);
    //     }
    // };

    componentDidMount(){
        this.props.onInitializeIngredient();
    }

    render() {

        let orderSummary = null;
        let burger = this.props.error ? <h3>Couldn't fetch ingredients, something went wrong!</h3> : <Spinner/>;
        if(!this.props.authenticated){
            burger = <Redirect to='/auth'/>;
        }
        else if (this.props.loading || !this.props.ingredients) {
            orderSummary = <Spinner/>;
        } else if (this.state.purchased) {
            orderSummary = <SuccessIcon/>;
        } else {
            console.log('[Loaded Ing]: ', this.props.ingredients);
            let disabledInfo = {...this.props.ingredients};
            for (let key in disabledInfo) {
                disabledInfo[key] = disabledInfo[key] <= 0;
            }
            orderSummary = <OrderSummary prices={INGREDIENT_PRICES} cancelClicked={this.cancelPurchase}
                                         proceedClicked={this.proceedToCheckout}/>;
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ingredients}/>
                    <BuildControls ordering={this.startPurchasing}
                                   onAdd={this.props.onAddIngredient}
                                   onRemove={this.props.onRemoveIngredient}
                                   disabled={disabledInfo} purchasable={this.activateOrderBtn()}/>
                </Aux>
            )
        }

        return (
            <Aux>
                <Modal show={this.state.purchasing || this.state.purchased} backdropClicked={this.cancelPurchase}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        )
    }
}

const mapPropsToStore = state => {
    return {
        ingredients: state.ingredients,
        totalPrice: state.totalPrice,
        error: state.error,
        loading: state.loading,
        authenticated: state.authenticated
    }
};

const mapDispatcherToStore = dispatcher => {
    return {
        onAddIngredient: (ingredient) => dispatcher(actions.addIngredient({
            payload: {
                ingredient: ingredient,
                price: INGREDIENT_PRICES[ingredient]
            }
        })),
        onRemoveIngredient: (ingredient) => dispatcher(actions.removeIngredient({
            payload: {
                ingredient: ingredient,
                price: INGREDIENT_PRICES[ingredient]
            }
        })),
        onInitializeIngredient: () => dispatcher(actions.initializeIngredients())
    }
};

export default connect(mapPropsToStore, mapDispatcherToStore)(withErrorHandler(BurgerBuilder, axios));