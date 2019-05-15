import React from 'react';
import Auxiliary from '../../hoc/Auxiliary';

import ToolBar from '../Navigation/ToolBar/ToolBar';

import styles from './Layout.module.css';

const Layout = (props) => {
    return (
        <Auxiliary>
            <ToolBar />
            <main className={styles.Content}>
                {props.children}
            </main>
        </Auxiliary>
    );
};

export default Layout;