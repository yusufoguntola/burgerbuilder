import React from 'react';
import styles from './CheckoutSummary.css';
import Burger from '../Burger/Burger';
import Button from '../../components/UI/Button/Button';

const checkoutSummary = (props) => (
    <div className={styles.Summary}>
        <h2>We hope you'd enjoy it!</h2>
        <Burger ingredients={props.ingredients}/>

        <div>
            <Button btnType="Danger" clicked={props.onCancel}>CANCEL</Button>
            <Button btnType="Success" clicked={props.onAccept}>CONTINUE</Button>
        </div>
    </div>
);

export default checkoutSummary;