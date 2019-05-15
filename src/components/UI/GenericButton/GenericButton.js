import React from 'react';

import styles from './GenericButton.module.css';

const GenericButton = (props) => {
    return (
        <button className={[styles.GenericButton, styles[props.btnType]].join(' ')} onClick={props.clicked}>{props.children}</button>
    );
};

export default GenericButton;