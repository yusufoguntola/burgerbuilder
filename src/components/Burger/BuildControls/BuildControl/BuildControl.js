import React from 'react';

import styles from './BuildControl.css';

const buildControl = (props) => {
    return (
        <div className={styles.ControlRowWrapper}>
            <div className={styles.ControlName}>{props.label}</div>
            <button onClick={() => props.onAdd(props.type)} className={styles.Control}>+</button>
            <button onClick={() => props.onRemove(props.type)} className={styles.Control} disabled={props.disabled}>-</button>
        </div>
    )
};

export default buildControl;