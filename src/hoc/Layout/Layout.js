import React, { Component } from 'react';
import Auxiliary from '../Auxiliary/Auxiliary';

import ToolBar from '../../components/Navigation/ToolBar/ToolBar';

import { connect } from 'react-redux';

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
        const { children, isAuthenticated } = this.props;
        return (
            <Auxiliary>
                <ToolBar isAuth={isAuthenticated} openMenu={this.openSideDrawerHandle} />
                <SideDrawer isAuth={isAuthenticated} open={this.state.showSideDrawer} closed={this.openSideDrawerHandle} />
                <main className={styles.Content}>
                    {children}
                </main>
                <Footer />
            </Auxiliary>
        )
    }
};

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.token !== null
    }
}

export default connect(mapStateToProps)(Layout);