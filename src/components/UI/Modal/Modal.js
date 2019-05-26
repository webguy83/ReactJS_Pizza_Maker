import React, { Component } from 'react';
import styles from './Modal.module.css';

import Auxilary from '../../../hoc/Auxiliary/Auxiliary';
import Backdrop from '../Backdrop/Backdrop';

class Modal extends Component {

    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.show !== this.props.show;
    }

    render() {
        return (
            <Auxilary>
                <Backdrop closeBackdrop={this.props.closeBackdropHandler} show={this.props.show} />
                <div className={styles.Modal} style={{
                    transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                    opacity: this.props.show ? '1' : '0'
                }}>
                    {this.props.children}
                </div>
            </Auxilary>
    
        );
    }
    
};

export default Modal;