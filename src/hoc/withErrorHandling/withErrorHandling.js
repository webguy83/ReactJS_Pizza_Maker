import React from 'react';
import errorHandler from '../../hooks/useErrorHandling';

import Modal from '../../components/UI/Modal/Modal';

export default (WrappedComp, axios) => {
    return (props) => {
        const [error, errConfirmHandler] = errorHandler(axios)
        return (
            <>
                <Modal show={error}
                    closeBackdrop={errConfirmHandler}
                >
                    {error ? error.message : null}
                </Modal>
                <WrappedComp {...props} />
            </>
        );
    }
};