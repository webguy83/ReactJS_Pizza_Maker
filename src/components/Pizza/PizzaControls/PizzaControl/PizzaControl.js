import React from 'react';

import styles from './PizzaControl.module.css';
import classNames from 'classnames';

const PizzaControl = (props) => {
    const {type, purchased} = props;
    return (
         <button style={{textTransform: "capitalize"}} 
                onClick={props.incredientClick} 
                className={classNames({[styles.ingredientBtn]: true, [styles.ingredientBtnSelected]: purchased })}>{type}
        </button>
    );
};

export default PizzaControl;