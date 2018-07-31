import React, {Component} from 'react';
import CheckoutSummary from '../../components/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
import {Route} from 'react-router-dom';
import {connect} from 'react-redux';

class Checkout extends Component {
    state = {

    };

    componentDidMount() {
        // const query = new URLSearchParams(this.props.location.query);
        // let ingredients = {};
        // let price = 0;
        // for (let param of query.entries()) {
        //     if (param[0] === 'price') {
        //         price = parseInt(param[1], 10);
        //     } else {
        //         ingredients[param[0]] = parseInt(param[1], 10);
        //     }
        // }
        // this.setState({ingredients: ingredients, price: price});
    }

    cancelCheckout = () => {
        this.props.history.replace('/');
    };

    acceptCheckout = () => {
        this.props.history.replace(this.props.match.path + '/contact-data');
    };

    render() {
        return (
            <div>
                <CheckoutSummary ingredients={this.props.ingredients} onCancel={this.cancelCheckout}
                                 onAccept={this.acceptCheckout}/>
                <Route path={this.props.match.path + '/contact-data'} component={ContactData}/>
                {/*<Route path={this.props.match.path + '/contact-data'}*/}
                       {/*render={(props) => (*/}
                           {/*<ContactData*/}
                               {/*ingredients={this.props.ingredients}*/}
                               {/*price={this.props.price} {...props}/>*/}
                       {/*)}/>*/}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        ingredients: state.ingredients,
        price: state.totalPrice
    }
};

export default connect(mapStateToProps)(Checkout);