import React, {Component} from 'react';

import Aux from '../../hoc/Auxiliary';
import styles from './Layout.css';
import Toolbar from './../Navigation/Toolbar/Toolbar';
import SideDrawer from './../Navigation/SideDrawer/SideDrawer';

class Layout extends Component {

    state = {
        showSideDrawer: false
    };

    hideSideDrawer = () => {
        this.setState({showSideDrawer: false});
    };

    showSideDrawer = () => {
        this.setState({showSideDrawer: true});
    };

    render() {
        return (
            <Aux>
                <Toolbar onShow={this.showSideDrawer}/>
                <SideDrawer onHide={this.hideSideDrawer} show={this.state.showSideDrawer}/>
                <main className={styles.Container}>
                    {this.props.children}
                </main>
            </Aux>
        )
    }
}

export default Layout;