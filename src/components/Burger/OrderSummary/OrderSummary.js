import React from 'react';

import Aux from '../../../hoc/Auxiliary';
import styles from './OrderSummary.css';
import Button from '../../UI/Button/Button';
import {connect} from 'react-redux';

const orderSummary = (props) => {
    let count = 0;
    let summary = Object.keys(props.ingredients).map((key, index) => {
        if(props.ingredients[key] <= 0){
            return [];
        }
        return (
            <tr key={key + index}>
                <td>{++count}</td>
                <td style={{textTransform: 'capitalize'}}>{key}</td>
                <td>x {props.ingredients[key]}</td>
                <td>${(props.ingredients[key] * props.prices[key]).toFixed(2)}</td>
            </tr>
        )
    }).reduce((prev, curr) => {
        return prev.concat(curr);
    }, []);
    if (summary.length === 0) {
        summary = <tr><td colSpan={4}>Select 1 or more ingredients</td></tr>
    }

    return (
        <Aux>
            <h3>Your Order: </h3>
            <p>A fresh delicious burger with the following ingredients: </p>
            <table className={styles.Table}>
                <thead>
                <tr>
                    <th>#</th>
                    <th>Ingredient</th>
                    <th>Unit</th>
                    <th>Price</th>
                </tr>
                </thead>
                <tbody>
                {summary}
                </tbody>
            </table>
            <p>Total: <strong>${props.price.toFixed(2)}</strong></p>
            <p>Proceed To Checkout?</p>
            <Button btnType='Danger' clicked={props.cancelClicked}>CANCEL</Button>
            <Button btnType='Success' clicked={props.proceedClicked}>PROCEED</Button>
        </Aux>
    )
};

const mapStateToProps = state => {
    return {
        ingredients: state.ingredients,
        price: state.totalPrice
    }
};

export default connect(mapStateToProps)(orderSummary);