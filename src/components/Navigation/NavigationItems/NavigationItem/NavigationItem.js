import React from 'react';
import styles from './NavigationItem.module.css';

import classNames from 'classnames';

const NavigationItem = (props) => {
    return (
        <li className={classNames({[styles.NavItem] : true, [styles.active] : props.active})}>
            <a href={props.link}>
               {props.text}
            </a>
        </li>
    );
};

export default NavigationItem;