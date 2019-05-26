import React from 'react';

import Logo from '../../Logo/Logo';
import Menu from '../Menu/Menu';

import styles from './ToolBar.module.css';
import NavigationItems from '../NavigationItems/NavigationItems';

const ToolBar = (props) => {
    return (
        <header className={styles.ToolBar}>
            <Menu openMenu={props.openMenu} />
            <Logo />
            <NavigationItems display="desktop" />
        </header>
    );
};

export default ToolBar;