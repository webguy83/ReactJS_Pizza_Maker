import React from 'react';

import Backdrop from '../../UI/Backdrop/Backdrop';
import Auxiliary from '../../../hoc/Auxiliary/Auxiliary';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';

import classNames from 'classnames';

import styles from './SideDrawer.module.css';

const SideDrawer = (props) => {
    return (
        <Auxiliary>
            <Backdrop show={props.open} closeBackdrop={props.closed}/>
            <div className={classNames({[styles.SideDrawer]: true}, {[props.open ? styles.open : styles.close]: true})}>
                <Logo colour="var(--pizza-pan-colour)" />
                <nav>
                    <NavigationItems />
                </nav>
            </div>
        </Auxiliary>
    );
};

export default SideDrawer;