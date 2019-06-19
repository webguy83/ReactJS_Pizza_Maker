import React, { Component } from 'react';
import styles from './ContactDataForm.module.css';

import axios from '../../../orders-axios';
import { connect } from 'react-redux';

import Spinner from '../../../components/UI/Spinner/Spinner';
import CustomInput from "../../../components/UI/CustomInput/CustomInput";
import GenericButton from '../../../components/UI/GenericButton/GenericButton';

class ContactDataForm extends Component {

    state = {
        formInfo: {
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
                    required: true,
                    minLength: 6,
                    maxLength: 6
                },
                touched: false
            },
            country: {
                element: "select",
                config: {
                    options: []
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
                touched: false
            }
        },
        formIsValid: false,
        loading: false
    }

    componentDidMount() {
        axios.get('https://restcountries.eu/rest/v2/all')
            .then(countries => {
                const listOfCountries = countries.data.map(item => {
                    return item.name;
                })
                this.setState((prevState) => {
                    return prevState.formInfo.country.config.options = listOfCountries;
                })
            })
            .catch(err => console.log(err));
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

    orderClicked = (e) => {
        e.preventDefault();

        if (this.state.formIsValid) {
            const formData = this.state.formInfo;

            const customerData = {};
            for (let key in formData) {
                customerData[key] = formData[key].value
            }

            const modifiedIngredients = this.props.ingredients.filter(ingredient => {
                return ingredient.purchased === true;
            }).map(ingredient => {
                return ingredient.type
            })
            
            this.setState({ loading: true })
            const order = {
                ingredients: modifiedIngredients,
                totalPrice: this.props.totalPrice + (this.props.totalPrice * .12),
                customerData
            }
            axios.post('/orders.json', order)
                .then(res => {
                    this.setState({ loading: false });
                    this.props.history.push('/');
                })
                .catch(err => {
                    this.setState({ loading: false });
                });
        }
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

    render() {
        const formdata = [];
        for (let key in this.state.formInfo) {
            formdata.push({
                name: key,
                elName: this.state.formInfo[key].element,
                config: this.state.formInfo[key].config,
                value: this.state.formInfo[key].value,
                shouldValidate: this.state.formInfo[key].validation,
                invalid: this.state.formInfo[key].validation ? !this.state.formInfo[key].validation.valid : null,
                touched: this.state.formInfo[key].touched
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
        let order = (<form className={styles.form}>
            {inputs}
            <GenericButton btnType="Success" btnDisabled={!this.state.formIsValid} clicked={this.orderClicked}>Place Your Order!</GenericButton>
        </form>);
        if (this.state.loading) {
            order = <Spinner />
        }
        return (
            <div className={styles.ContactDataForm}>
                <h2 className={styles.header}>Contact Form:</h2>
                {order}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        ingredients: state.ingredients,
        totalPrice: state.totalPrice
    }
}

export default connect(mapStateToProps)(ContactDataForm);