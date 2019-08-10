import React, { useState, useEffect } from 'react';
import styles from './ContactDataForm.module.css';

import axios from '../../../orders-axios';
import { connect } from 'react-redux';
import withErrorHanding from '../../../hoc/withErrorHandling/withErrorHandling';

import * as actions from '../../../store/actions/index';
import { checkIsValid, updateObjState } from '../../../utils/utility';

import Spinner from '../../../components/UI/Spinner/Spinner';
import CustomInput from "../../../components/UI/CustomInput/CustomInput";
import GenericButton from '../../../components/UI/GenericButton/GenericButton';

const ContactDataForm = (props) => {

    const [formInfo, setFormInfo] = useState({
        name: {
            element: "input",
            config: {
                type: "text"
            },
            value: "",
            validation: {
                valid: false,
                required: true
            },
            touched: false
        },
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
        street: {
            element: "input",
            config: {
                type: "text"
            },
            value: "",
            validation: {
                valid: false,
                required: true
            },
            touched: false
        },
        postalCode: {
            element: "input",
            config: {
                type: "text"
            },
            value: "",
            validation: {
                valid: false,
                required: true
            },
            touched: false
        },
        country: {
            element: "select",
            config: {
                options: []
            },
            validation: {
                required: false
            },
            value: ""
        },
        comments: {
            element: "textarea",
            config: {
                rows: 4,
                cols: 50
            },
            value: "",
            validation: {
                required: false
            },
            touched: false
        }
    });

    const [formIsValid, setFormIsValid] = useState(false);

    useEffect(() => {
        axios.get('https://restcountries.eu/rest/v2/all')
            .then(countries => {
                const listOfCountries = countries.data.map(item => {
                    return item.name;
                })
                const updatedForm = {...formInfo};
                updatedForm.country.config.options = listOfCountries;
                setFormInfo(updatedForm);
            })
            .catch(err => console.log(err));
            // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const orderClicked = (e) => {
        e.preventDefault();

        if (formIsValid) {
            const formData = formInfo;

            const customerData = {};
            for (let key in formData) {
                customerData[key] = formData[key].value
            }

            const modifiedIngredients = props.ingredients.filter(ingredient => {
                return ingredient.purchased === true;
            }).map(ingredient => {
                return ingredient.type
            })

            const userId = props.userId ? props.userId : localStorage.getItem('userId');

            const order = {
                ingredients: modifiedIngredients,
                totalPrice: props.totalPrice + (props.totalPrice * .12),
                customerData,
                userId
            }
            props.postOrderToDatabase(order)
            props.history.push({
                pathname: '/orders'
            });
        }
    }

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
    let order = (<form className={styles.form}>
        {inputs}
        <GenericButton btnType="Success" btnDisabled={!formIsValid} clicked={orderClicked}>Place Your Order!</GenericButton>
    </form>);
    if (props.loading) {
        order = <Spinner />
    }
    return (
        <div className={styles.ContactDataForm}>
            <h2 className={styles.header}>Contact Form:</h2>
            {order}
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        ingredients: state.pizzaMaker.ingredients,
        totalPrice: state.pizzaMaker.totalPrice,
        loading: state.order.loading,
        userId: state.auth.userId
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        postOrderToDatabase: (orderData) => {
            return dispatch(actions.postOrderToDatabase(orderData))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHanding(ContactDataForm, axios));