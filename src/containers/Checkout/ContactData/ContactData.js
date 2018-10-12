import React, { Component } from 'react';
import { connect } from "react-redux";
import Button from "../../../components/UI/Button/Button";
import classes from "./ContactData.css";
import Input from "../../../components/UI/Input/Input";
import Spinner from "../../../components/UI/Spinner/Spinner";
import axios from "../../../axios-orders";
import withErrorHandler from "../../../HOC/withErrorHandler/withErrorHandler";
import * as actions from "../../../store/actions/index";

class ContactData extends Component {
    state = {
        orderForm: {
                name: {
                    elementType: 'input',
                    elementConfig: {
                        type: "text",
                        placeholder: "Your Name"
                    },
                    value: "",
                    validation: {
                        required: true,
                    },
                    valid: false,
                    touched: false
                },
                street: {
                    elementType: 'input',
                    elementConfig: {
                        type: "text",
                        placeholder: "Street Address"
                    },
                    value: "",
                    validation: {
                        required: true
                    },
                    valid: false,
                    touched: false
                },
                zipCode: {
                    elementType: 'input',
                    elementConfig: {
                        type: "text",
                        placeholder: "Zip Code"
                    },
                    value: "",
                    validation: {
                        required: true,
                        minLength: 5,
                        maxLength: 5
                    },
                    valid: false,
                    touched: false
                },
                country: {
                    elementType: 'input',
                    elementConfig: {
                        type: "text",
                        placeholder: "Country"
                    },
                    value: "",
                    validation: {
                        required: true
                    },
                    valid: false,
                    touched: false
                },
                email: {
                    elementType: 'input',
                    elementConfig: {
                        type: "email",
                        placeholder: "Your Email"
                    },
                    value: "",
                    validation: {
                        required: true
                    },
                    valid: false,
                    touched: false
                },
                deliveryMethod: {
                    elementType: 'select',
                    elementConfig: {
                        options: [
                            {value: "fastest", displayValue: "Fastest"},
                            {value: "cheapest", displayValue: "Cheapest"}
                        ]
                    },
                    value: "cheapest",
                    validation: {},
                    valid: true
                },
        },
        formIsValid: false,
    }

    orderHandler = (event) => {
        event.preventDefault();
        // After the for-in loop formData becomes an object with the keys being the input fields and the values being the inputted text
        const formData = {};
        for (let formElementIdentifier in this.state.orderForm) {
            // The line below sets the formData[identifier] to the value of the inputted text (i.e. name: "Peter", address: "123 Drury Lane")
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
        }

        const order = {
            ingredients: this.props.ings,
            price: this.props.price,
            orderData: formData
        }
        // Sends the order to the reducer function at the bottom
        this.props.onOrderBurger(order);
    }

    inputChangedHandler = (event, inputIdentifier) => {
        const updatedOrderForm = {
            ...this.state.orderForm
        }

        const updatedFormElement = {
            ...updatedOrderForm[inputIdentifier]
        }

        // TODO: Get clarification on the object here, mostly the updatedOrderForm and what the for-in loop is doing
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedOrderForm[inputIdentifier] = updatedFormElement;
        let formIsValid = true;
        for (let inputIdentifier in updatedOrderForm) {
            formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
        }
        console.log(updatedOrderForm);
        this.setState({ orderForm: updatedOrderForm, formIsValid: formIsValid });
    }

    checkValidity = (value, rules) => {
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

    render() {
        const formElementsArray = [];
        // For each input field, push the key itself (name, address, etc.) as the ID with the config being set to the rest of the values for that key
        for (let key in this.state.orderForm) {
            formElementsArray.push({
                id: key,
                // config property shows the rest of the information (elementType, placeholder, etc.)
                config: this.state.orderForm[key]
            });
        }
        
        let form = (
            <form onSubmit={this.orderHandler}>
                {formElementsArray.map(formElement => (
                    <Input 
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        invalid={!formElement.config.valid}
                        shouldValidate={formElement.config.validation}
                        touched={formElement.config.touched}
                        changed={(event) => this.inputChangedHandler(event, formElement.id)}/>
                ))};
                <Button clicked={this.orderHandler} disabled={!this.state.formIsValid} btnType="Success">ORDER</Button>
            </form>
        );

        if (this.props.loading) {
            form = <Spinner />
        };
        return (
            <div className={classes.ContactData}>
                <h4>Your Information: </h4>
                { form }
            </div>
        );
    };
};

// TODO: What EXACTLY does this const do with Redux? Why do we map state to props? Why do we use props instead of state after this has been added?
const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        price: state.totalPrice,
        loading: state.loading
    }
}

// TODO: Same here, what exactly are we doing? 
const mapDispatchToProps = dispatch => {
    return {
        onOrderBurger: ( orderData ) => dispatch(actions.purchaseBurger(orderData))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));
