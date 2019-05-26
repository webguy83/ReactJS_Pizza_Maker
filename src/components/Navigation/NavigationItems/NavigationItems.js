import React from 'react';
import styles from './NavigationItems.module.css';

import NavigationItem from './NavigationItem/NavigationItem';

const NavigationItems = () => {
    return (
        <ul className={styles.NavItems}>
            <NavigationItem link="/" text="Pizza Maker" active />
            <NavigationItem link="/" text="Checkout" />
        </ul>
    );
};

export default NavigationItems;