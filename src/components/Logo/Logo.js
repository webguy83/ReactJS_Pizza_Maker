import React from 'react';

import styles from './Logo.module.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHamburger } from '@fortawesome/free-solid-svg-icons';

const Logo = () => {
    return (
        <FontAwesomeIcon icon={faHamburger} className={styles.Logo} />
    );
};

export default Logo;