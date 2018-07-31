import React, {Component} from 'react';

import styles from './Orders.css';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as actions from '../../store/actions/index';
import {connect} from 'react-redux';
import {Redirect} from 'react-router';

class Orders extends Component {

    componentDidMount() {
        this.props.onFetchOrders();
    }

    getIngredients = (ingredients) => {
        let output = [];
        let index = 0;
        for (let key in ingredients) {
            output.push(<span className={styles.Ingredient} key={key + index}>{key} ({ingredients[key]})</span>);
            index++;
        }
        return output;
    };

    render() {
        let output = <Spinner/>;
        if(!this.props.authenticated){
            output = <Redirect to="/"/>
        }
        else if (this.props.orders) {
            output = this.props.orders.map(item => {
                return (
                    <div className={styles.OrderItem} key={item.id}>
                        <p><span className={styles.Title}>Customer: </span> <span
                            className={styles.Name}>{item.customer.name}</span></p>
                        <p><span className={styles.Title}>Ingredients: </span> {this.getIngredients(item.ingredients)}
                        </p>
                        <p><span className={styles.Title}>Price: </span> <span
                            className={styles.Price}>${parseFloat(item.price).toFixed(2)}</span></p>
                    </div>
                )
            });
        }
        return (
            <div className={styles.Order}>
                {output}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        orders: state.orders,
        authenticated: state.authenticated
    }
};

const mapDispatcherToProps = dispatcher => {
    return {
        onFetchOrders: () => dispatcher(actions.fetchOrders())
    }
};

export default connect(mapStateToProps, mapDispatcherToProps)(Orders);