import React from 'react';

import styles from './PizzaControl.module.css';

const PizzaControl = (props) => {
    const {type} = props;
    return (
         <button className={styles.ingredientBtn}>{type}</button>
    );
};

export default PizzaControl;