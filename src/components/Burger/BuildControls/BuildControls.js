import React from 'react';

import styles from './BuildControls.css';
import {connect} from 'react-redux';
import BuildControl from './BuildControl/BuildControl';

const controls = [
    {label: 'Meat', type: 'meat'},
    {label: 'Cheese', type: 'cheese'},
    {label: 'Salad', type: 'salad'},
    {label: 'Bacon', type: 'bacon'},
];

const buildControls = (props) => {
    return (
        <div className={styles.ControlContainer}>
            <div className={styles.PriceWrapper}><span className={styles.PriceSpan}>Current Price: </span><p
                className={styles.Price}>${props.price.toFixed(2)}</p></div>
            {
                controls.map(ctrl => {
                    return <BuildControl
                        onAdd={props.onAdd}
                        onRemove={props.onRemove}
                        label={ctrl.label}
                        key={ctrl.type}
                        type={ctrl.type}
                        disabled={props.disabled[ctrl.type]}/>
                })
            }
            <button onClick={props.ordering} className={styles.OrderButton} disabled={!props.purchasable}>ORDER NOW
            </button>
        </div>
    )
};
const mapStateToProps = state => {
    return {
        price: state.totalPrice
    }
};
export default connect(mapStateToProps)(buildControls);