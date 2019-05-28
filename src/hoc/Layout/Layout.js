import React, { Component } from 'react';
import Auxiliary from '../Auxiliary/Auxiliary';

import ToolBar from '../../components/Navigation/ToolBar/ToolBar';

import styles from './Layout.module.css';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import Footer from '../../components/Footer/Footer';

class Layout extends Component {

    state = {
        showSideDrawer: false
    }

    closeSideDrawerHandle = () => {
        this.setState({
            showSideDrawer: false
        })
    }

    openSideDrawerHandle = () => {
        this.setState({
            showSideDrawer: true
        })
    }


    render() {
        return (
            <Auxiliary>
                <ToolBar openMenu={this.openSideDrawerHandle} />
                <SideDrawer open={this.state.showSideDrawer} closed={this.closeSideDrawerHandle} />
                <main className={styles.Content}>
                    {this.props.children}
                </main>
                <Footer />
            </Auxiliary>
        )
    }
};

export default Layout;