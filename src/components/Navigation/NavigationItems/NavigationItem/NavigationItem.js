import React from 'react';
import styles from './NavigationItem.module.css';

import {NavLink} from 'react-router-dom';

const NavigationItem = (props) => {
    return (
        <li className={styles.NavItem} onClick={() => console.log("This will lead to somewhere eventually! :)")}>
            <NavLink to={props.link}
                     activeClassName={styles.NavItemActive}
                     exact
            >{props.text}</NavLink>
        </li>
    );
};

export default NavigationItem;