import React from 'react';
import styles from './SideDrawer.css';

import Logo from '../../Logo/Logo';
import NavigationItems from './../NavigationItems/NavigationItems';
import BackDrop from '../../UI/Backdrop/Backdrop';
import Aux from '../../../hoc/Auxiliary';


const sideDrawer = (props) => {
    return (
        <Aux>
            <BackDrop clicked={props.onHide} show={props.show}/>
            <div className={[styles.SideDrawer, props.show ? styles.Open : styles.Close].join(' ')}>
                <div className={styles.Logo}><Logo/></div>
                <nav>
                    <NavigationItems/>
                </nav>
            </div>
        </Aux>

    )
};

export default sideDrawer;