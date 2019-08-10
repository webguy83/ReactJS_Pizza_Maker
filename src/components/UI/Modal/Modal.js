import React from 'react';
import styles from './Modal.module.css';

import Backdrop from '../Backdrop/Backdrop';

const Modal = (props) => {

    return (
        <>
            <Backdrop closeBackdrop={props.closeBackdropHandler} show={props.show} />
            <div className={styles.Modal} style={{
                transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
                opacity: props.show ? '1' : '0'
            }}>
                {props.children}
            </div>
        </>

    );
};

export default React.memo(Modal, (prevProps, nextProps) => {
    return nextProps.show === prevProps.show && nextProps.children === prevProps.children;
});