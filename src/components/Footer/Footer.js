import React from 'react';
import styles from './Footer.module.css';

const Footer = () => {
    return (
        <footer className={styles.Footer}>
            <p>&copy; Curtis Yacboski {new Date().getFullYear()}</p>
        </footer>
    );
};

export default Footer;