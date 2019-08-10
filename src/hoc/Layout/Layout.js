import React, { useState } from 'react';

import ToolBar from '../../components/Navigation/ToolBar/ToolBar';

import { connect } from 'react-redux';

import styles from './Layout.module.css';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import Footer from '../../components/Footer/Footer';

const Layout = (props) => {

    const [showSideDrawer, setShowSideDrawer] = useState(false);
    const { children, isAuthenticated } = props;

    const closeSideDrawerHandle = () => {
        setShowSideDrawer(false)
    }

    const openSideDrawerHandle = () => {
        setShowSideDrawer(true)
    }

    return (
        <>
            <ToolBar isAuth={isAuthenticated} openMenu={openSideDrawerHandle} />
            <SideDrawer isAuth={isAuthenticated} open={showSideDrawer} closed={closeSideDrawerHandle} />
            <main className={styles.Content}>
                {children}
            </main>
            <Footer />
        </>
    )
};

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.token !== null
    }
}

export default connect(mapStateToProps)(Layout);