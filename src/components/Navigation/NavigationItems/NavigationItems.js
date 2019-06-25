import React from 'react';
import styles from './NavigationItems.module.css';

import NavigationItem from './NavigationItem/NavigationItem';

const NavigationItems = (props) => {
    return (
        <nav className={props.display === "desktop" ? styles.desktopVersion : null}>
            <ul className={styles.NavItems}>
                <NavigationItem link="/" text="Pizza Maker" active />
                <NavigationItem link="/orders" text="Orders" />
                <NavigationItem link="/auth" text="Authorization" />
            </ul>
        </nav>
    );
};

export default NavigationItems;