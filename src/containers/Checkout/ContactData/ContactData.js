import React, {Component} from 'react';

import Button from '../../../components/UI/Button/Button';
import Input from '../../../components/UI/Input/Input';
import styles from './ContactData.css';
import Spinner from '../../../components/UI/Spinner/Spinner';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import * as actions from '../../../store/actions/index';

class ContactData extends Component {
    state = {
        loading: false,
        controls: {
            name: {
                config: {
                    name: 'name',
                    placeholder: 'Your Fullname',
                    type: 'text'
                },
                value: ''
            },
            phone: {
                config: {
                    name: 'phone',
                    placeholder: 'Your Phone',
                    type: 'text'
                },
                value: ''
            },
            email: {
                config: {
                    name: 'email',
                    placeholder: 'Your Email',
                    type: 'email'
                },
                value: ''
            },
            street: {
                config: {
                    name: 'street',
                    placeholder: 'Street',
                    type: 'text'
                },
                value: ''
            },
            postal: {
                config: {
                    name: 'postal',
                    placeholder: 'Postal Code',
                    type: 'text'
                },
                value: ''
            },
            country: {
                config: {
                    name: 'country',
                    placeholder: 'Country',
                    type: 'text'
                },
                value: ''
            },
        }
    };

    onInputChanged = (name, value) => {
        let state = {...this.state};
        let controls = {...this.state.controls};
        controls[name].value = value;
        state.controls = controls;
        this.setState({...state});
    };

    proceedWithOrder = (event) => {
        event.preventDefault();
        this.setState({loading: true});
        const data = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            customer: {
                name: this.state.controls.name.value,
                phone: this.state.controls.phone.value,
                email: this.state.controls.email.value,
                address: {
                    street: this.state.controls.street.value,
                    zipCode: this.state.controls.postal.value,
                    country: this.state.controls.country.value
                }
            },
            purchaseDate: new Date(),
            deliveryMethod: 'fastest'
        };
        this.props.onSubmitOrder(data);
    };

    render() {
        let form = (
            <form onSubmit={this.proceedWithOrder}>
                {Object.keys(this.state.controls).map((key, index) => {
                    const control = this.state.controls[key];
                    return <Input key={control.config.name + index} value={control.value} type={control.config.type} changed={(event) => this.onInputChanged(control.config.name, event)} {...control.config}/>
                })}

                <Button btnType="Success">ORDER NOW</Button>
            </form>
        );
        if (this.props.loading) {
            form = <Spinner/>;
        } else if (this.props.ordered) {
            form = <Redirect to="/"/>
        }
        return (
            <div className={styles.Contact}>
                <h3>Supply your contact details below!</h3>
                {form}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        ingredients: state.ingredients,
        price: state.totalPrice,
        loading: state.loading,
        ordered: state.ordered
    }
};

const mapDispatcherToProps = dispatcher => {
    return {
        onSubmitOrder: (data) => dispatcher(actions.submitOrder(data))
    }
};

export default connect(mapStateToProps, mapDispatcherToProps)(ContactData);