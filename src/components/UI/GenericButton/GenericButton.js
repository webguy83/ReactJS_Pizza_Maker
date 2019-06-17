import React from 'react';

import styles from './GenericButton.module.css';

const GenericButton = (props) => {
    const { btnType, clicked, children, btnDisabled } = props;
    return (
        <button disabled={btnDisabled} className={[styles.GenericButton, styles[btnType]].join(' ')} onClick={clicked}>{children}</button>
    );
};

export default GenericButton;