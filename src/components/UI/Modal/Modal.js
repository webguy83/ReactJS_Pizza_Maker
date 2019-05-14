import React from 'react';
import styles from './Modal.module.css';

import Auxilary from '../../../hoc/Auxiliary';
import Backdrop from '../Backdrop/Backdrop';

const Modal = (props) => {
    return (
        <Auxilary>
            <Backdrop closeBackdrop={props.closeBackdropHandler} show={props.show} />
            <div className={styles.Modal} style={{
                transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
                opacity: props.show ? '1' : '0'
            }}>
                {props.children}
            </div>
        </Auxilary>

    );
};

export default Modal;