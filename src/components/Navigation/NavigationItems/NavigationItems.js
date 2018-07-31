import React from 'react';
import styles from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';


const navigationItems = (props) => (
    <ul className={styles.NavigationItems}>
        <NavigationItem link='/'>Build Burger</NavigationItem>
        <NavigationItem link='/orders'>Orders</NavigationItem>
    </ul>
);

export default navigationItems;