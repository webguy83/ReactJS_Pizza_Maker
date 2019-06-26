import React, { Component } from 'react';
import styles from './Auth.module.css';

import * as actions from '../../store/actions/index';
import { connect } from 'react-redux';

import { Redirect } from 'react-router-dom';

import GenericButton from '../../components/UI/GenericButton/GenericButton';
import CustomInput from '../../components/UI/CustomInput/CustomInput';
import Spinner from '../../components/UI/Spinner/Spinner';

import { removeUnderscoreForSpace } from '../../utils/utility';

class Auth extends Component {
    state = {
        formInfo: {
            email: {
                element: "input",
                config: {
                    type: "email"
                },
                value: "",
                validation: {
                    valid: false,
                    required: true
                },
                touched: false
            },
            password: {
                element: "input",
                config: {
                    type: "password"
                },
                value: "",
                validation: {
                    valid: false,
                    minLength: 6,
                    required: true
                },
                touched: false
            }
        },
        formIsValid: false,
        signInMode: true
    }

    checkIsValid = (value, rules) => {
        let isValid = true;

        if (rules.required) {
            isValid = value.trim() !== "" && isValid;
        }
        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }
        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid;
        }

        return isValid;
    }

    handleInputChange = (e) => {
        const name = e.target.name;
        const updatedForm = { ...this.state.formInfo };
        const updatedElement = { ...updatedForm[name] };
        const updatedValidaton = { ...updatedElement.validation };

        updatedElement.value = e.target.value;
        updatedValidaton.valid = this.checkIsValid(e.target.value, updatedValidaton)
        updatedElement.touched = true;
        updatedElement.validation = updatedValidaton;
        updatedForm[name] = updatedElement;

        // check all validation
        let formIsValid = true
        for (let element in updatedForm) {
            if (updatedForm[element].validation) {
                if (updatedForm[element].validation.valid === false) {
                    formIsValid = false;
                }
            }
        }

        this.setState({
            formInfo: updatedForm,
            formIsValid
        })
    }

    authClicked = (e) => {
        e.preventDefault();
        const { formInfo, signInMode } = this.state;
        this.props.authClicked(formInfo.email.value, formInfo.password.value, signInMode);
    }

    switchModes = () => {
        this.setState((prevState) => {
            return {
                signInMode: !prevState.signInMode
            }
        })
    }

    render() {
        const formdata = [];
        const { formInfo } = this.state;
        for (let key in formInfo) {
            const { element, config, value, validation, touched } = formInfo[key];
            formdata.push({
                name: key,
                elName: element,
                config,
                value,
                shouldValidate: validation,
                invalid: validation ? !validation.valid : null,
                touched
            })
        };

        const inputs = formdata.map(item => {
            return <CustomInput key={item.name}
                label={item.name}
                elname={item.elName}
                config={item.config}
                value={item.value}
                handlechange={this.handleInputChange}
                invalid={item.invalid}
                shouldValidate={item.shouldValidate}
                touched={item.touched} />
        });

        const form = !this.props.loading ? (<form className={styles.form}>
            {this.props.error ? <p className={styles.error}>{removeUnderscoreForSpace(this.props.error)}!</p> : null}
            {inputs}
            <GenericButton type="submit" clicked={this.authClicked} btnType="Success" btnDisabled={!this.state.formIsValid}>Submit</GenericButton>
        </form>) : <Spinner />;

        let reDirect;

        if(this.props.isAuthenticated && this.props.purchasingPizza) {
            this.props.buyPizzaPurchasing(false);
            reDirect = <Redirect to="/checkout" />
        } else if(this.props.isAuthenticated && !this.props.purchasingPizza) {
            reDirect = <Redirect to="/" />
        } else {
            reDirect = null;
        }

        return (
            <div className={styles.Auth}>
                {reDirect}
                <h2 className={styles.header}>Authorization Form:</h2>
                {form}
                <GenericButton btnType="Failure" clicked={this.switchModes}>{this.state.signInMode ? "Haven't registered? Switch to register now!" : "Switch to Sign In"}</GenericButton>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const { loading, error, token } = state.auth;
    return {
        loading,
        error,
        purchasingPizza: state.pizzaMaker.purchasingPizza,
        isAuthenticated: token !== null
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        authClicked: (email, password, signInMode) => {
            return dispatch(actions.auth(email, password, signInMode));
        },
        buyPizzaPurchasing: (purchasing) => {
            return dispatch(actions.buyPizzaPurchasing(purchasing))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);