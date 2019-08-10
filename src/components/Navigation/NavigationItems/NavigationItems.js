import React from 'react';
import styles from './NavigationItems.module.css';

import NavigationItem from './NavigationItem/NavigationItem';

const NavigationItems = (props) => {
    const { isAuth, display } = props;
    return (
        <nav className={display === "desktop" ? styles.desktopVersion : null}>
            <ul className={styles.NavItems}>
                <NavigationItem link="/" text="Pizza Maker" active />
                {isAuth ?
                    <>
                        <NavigationItem link="/orders" text="Orders" />
                        <NavigationItem link="/logout" text="Logout" />
                    </>
                    :
                    <NavigationItem link="/auth" text="Login" />
                }

            </ul>
        </nav>
    );
};

export default NavigationItems;