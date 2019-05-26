import React from 'react';
import styles from './Menu.module.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

const Menu = (props) => {
    return (
        <div className={styles.Menu} onClick={props.openMenu}>
            <FontAwesomeIcon icon={faBars} />
        </div>
    );
};

export default Menu;