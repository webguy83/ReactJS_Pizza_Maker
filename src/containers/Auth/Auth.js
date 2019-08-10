import React, { useState } from 'react';
import styles from './Auth.module.css';

import * as actions from '../../store/actions/index';
import { connect } from 'react-redux';

import { Redirect } from 'react-router-dom';

import GenericButton from '../../components/UI/GenericButton/GenericButton';
import CustomInput from '../../components/UI/CustomInput/CustomInput';
import Spinner from '../../components/UI/Spinner/Spinner';

import { removeUnderscoreForSpace, checkIsValid, updateObjState } from '../../utils/utility';

const Auth = (props) => {

    const [formInfo, setFormInfo] = useState({
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
                required: true
            },
            touched: false
        }
    });

    const [formIsValid, setFormIsValid] = useState(false);
    const [signInMode, setSignInMode] = useState(true);

    const handleInputChange = (e) => {
        const name = e.target.name;
        const updatedForm = { ...formInfo };

        const updatedElement = updateObjState(updatedForm[name], {
            value: e.target.value,
            touched: true,
            validation: updateObjState(updatedForm[name].validation, {
                valid: checkIsValid(e.target.value, updatedForm[name].validation)
            })
        })

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

        setFormInfo(updatedForm);
        setFormIsValid(formIsValid);
    }

    const authClicked = (e) => {
        e.preventDefault();
        props.authClicked(formInfo.email.value, formInfo.password.value, signInMode);
    }

    const switchModes = () => {
        setSignInMode(!signInMode)
    }


    const formdata = [];
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
            handlechange={handleInputChange}
            invalid={item.invalid}
            shouldValidate={item.shouldValidate}
            touched={item.touched} />
    });

    const form = !props.loading ? (<form className={styles.form}>
        {props.error ? <p className={styles.error}>{removeUnderscoreForSpace(props.error)}!</p> : null}
        {inputs}
        <GenericButton type="submit" clicked={authClicked} btnType="Success" btnDisabled={!formIsValid}>Submit</GenericButton>
    </form>) : <Spinner />;

    let reDirect;

    if (props.isAuthenticated && props.purchasingPizza) {
        props.buyPizzaPurchasing(false);
        reDirect = <Redirect to="/checkout" />
    } else if (props.isAuthenticated && !props.purchasingPizza) {
        reDirect = <Redirect to="/" />
    } else {
        reDirect = null;
    }

    return (
        <div className={styles.Auth}>
            {reDirect}
            <h2 className={styles.header}>Authorization Form:</h2>
            <p style={{ fontSize: "1.5rem", maxWidth: "40rem", marginBottom: "1rem" }}>For testing purposes feel free to login as: <span style={{ fontWeight: "bold" }}>admin@admin.com</span> and password <span style={{ fontWeight: "bold" }}>theadmin</span> or just register a new email and password.</p>
            {form}
            <GenericButton btnType="Failure" clicked={switchModes}>{signInMode ? "Haven't registered? Switch to register now!" : "Switch to Sign In"}</GenericButton>
        </div>
    );

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