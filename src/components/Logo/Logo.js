import React from 'react';

import styles from './Logo.module.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPizzaSlice } from '@fortawesome/free-solid-svg-icons';

const Logo = (props) => {
    return (
        <FontAwesomeIcon icon={faPizzaSlice} 
                        className={styles.Logo} 
                        style={props.colour ? { color: props.colour } : { color: "#fff" }} />
    );
};

export default Logo;