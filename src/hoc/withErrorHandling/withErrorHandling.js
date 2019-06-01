import React, { Component } from 'react';

import Modal from '../../components/UI/Modal/Modal';
import Auxiliary from '../Auxiliary/Auxiliary';

export default (WrappedComp, axios) => {
    return class extends Component {
        state = {
            error: null
        }

        componentWillMount () {
            this.reqInt = axios.interceptors.request.use(req => {
                this.setState({error: null});
                return req;
            });

            this.resInt = axios.interceptors.response.use(res => res, err => {
                this.setState({error: err})
            });
        }

        componentWillUnmount () {
            axios.interceptors.request.eject(this.reqInt);
            axios.interceptors.request.eject(this.resInt);
        }

        errConfirmHandler = () => {
            this.setState({error: null});
        }

        render() {
            return (
                <Auxiliary>
                    <Modal show={this.state.error}
                           closeBackdrop={this.errConfirmHandler}
                    >
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComp {...this.props} />
                </Auxiliary>
            );
        }
    }
};