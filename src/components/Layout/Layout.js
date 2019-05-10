import React from 'react';
import Auxiliary from '../../hoc/Auxiliary';

import styles from './Layout.module.css';

const Layout = (props) => {
    return (
        <Auxiliary>
            <div> Toobar, sidedrawer, backdrop</div>
            <main className={styles.Content}>
                {props.children}
            </main>
        </Auxiliary>
    );
};

export default Layout;