import React, {Component} from 'react';
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import Spinner from '../../components/UI/Spinner/Spinner';
import styles from './Auth.css';

import * as actions from '../../store/actions/index';

import {connect} from 'react-redux';

class Auth extends Component {
    state = {
        controls: {
            email: {
                config: {
                    name: 'email',
                    placeholder: 'Your Email',
                    type: 'email',
                    required: 'required'
                },
                value: ''
            },
            password: {
                config: {
                    name: 'password',
                    placeholder: 'Password',
                    type: 'password',
                    required: 'required'
                },
                value: ''
            },
        },
        loading: false
    };

    authenticate = () => {

    };

    onInputChanged = (name, event) => {
        const value = event.target.value;
        let state = {...this.state};
        let controls = {...this.state.controls};
        controls[name].value = value;
        state.controls = controls;
        this.setState({...state});
    };

    onSignupClicked = (event) => {
        event.preventDefault();
        const email = this.state.controls.email.value;
        const password = this.state.controls.password.value;
        this.props.onSignUp(email, password);
    };

    onSigninClicked = (event) => {
        event.preventDefault();
        const email = this.state.controls.email.value;
        const password = this.state.controls.password.value;
        this.props.onSignIn(email, password);
    };

    render() {
        let form = (
            <form onSubmit={this.authenticate}>
                {Object.keys(this.state.controls).map((key, index) => {
                    const control = this.state.controls[key];
                    return <Input key={control.config.name + index} value={control.value} type={control.config.type}
                                  changed={(event) => this.onInputChanged(control.config.name, event)} {...control.config}/>
                })}

                <Button btnType="Success" clicked={this.onSignupClicked}>SIGNUP</Button>
                <Button btnType="Success" clicked={this.onSigninClicked}>SIGNIN</Button>
            </form>
        );
        if (this.state.loading) {
            form = <Spinner/>;
        }
        return (
            <div className={styles.Contact}>
                <h3>Supply your details below to login!</h3>
                {form}
            </div>
        )
    }
}

const mapDispatcherToProps = dispatcher => {
    return {
        onSignUp: (email, password) => dispatcher(actions.signup(email, password)),
        onSignIn: (email, password) => dispatcher(actions.signin(email, password)),
    }
};

export default connect(null, mapDispatcherToProps)(Auth);