import React from 'react';
import styles from './Input.css';

const input = (props) => {
    return (
        <input className={styles.Input}
               onChange={props.changed} {...props}/>
    );
};

export default input;