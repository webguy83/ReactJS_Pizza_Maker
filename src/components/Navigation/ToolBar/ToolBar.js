import React from 'react';

import Logo from '../../Logo/Logo';
import Menu from '../Menu/Menu';

import styles from './ToolBar.module.css';
import NavigationItems from '../NavigationItems/NavigationItems';

const ToolBar = (props) => {
    const {openMenu, isAuth} = props;
    return (
        <header className={styles.ToolBar}>
            <Menu openMenu={openMenu} />
            <Logo />
            <NavigationItems isAuth={isAuth} display="desktop" />
        </header>
    );
};

export default ToolBar;