import React from 'react';

import Logo from '../../Logo/Logo';

import styles from './ToolBar.module.css';

const ToolBar = () => {
    return (
        <header className={styles.ToolBar}>
            <div>Menu</div>
            <Logo />
            <nav>...</nav>
        </header>
    );
};

export default ToolBar;