import React from 'react';
import styles from './NavigationItem.module.css';

import {NavLink} from 'react-router-dom';

const NavigationItem = (props) => {
    return (
        <li className={styles.NavItem}>
            <NavLink to={props.link}
                     activeClassName={styles.NavItemActive}
                     exact
            >{props.text}</NavLink>
        </li>
    );
};

export default NavigationItem;