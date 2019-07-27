import React from 'react';

import Backdrop from '../../UI/Backdrop/Backdrop';
import Auxiliary from '../../../hoc/Auxiliary/Auxiliary';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';

import classNames from 'classnames';

import styles from './SideDrawer.module.css';

const SideDrawer = (props) => {
    const {open, closed, isAuth} = props;
    return (
        <Auxiliary>
            <Backdrop show={open} closeBackdrop={closed}/>
            <div className={classNames({[styles.SideDrawer]: true}, {[open ? styles.open : styles.close]: true})}>
                <Logo colour="white" />
                <NavigationItems isAuth={isAuth} />
            </div>
        </Auxiliary>
    );
};

export default SideDrawer;