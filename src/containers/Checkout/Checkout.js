import React, { Component } from 'react';
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import { Route } from "react-router-dom";
import ContactData from "../Checkout/ContactData/ContactData";

class Checkout extends Component {
    state = {
        ingredients: {
            meat: 1,
            lettuce: 1,
            cheese: 1,
            bacon: 1
        }
    }

    componentDidMount() {
        const query = new URLSearchParams(this.props.location.search);
        const ingredients = {}
        for (let param of query.entries()) {
            ingredients[param[0]] = +param[1]
        }
        this.setState({ ingredients: ingredients });
    }

    checkoutCanceledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace("/checkout/contact-data");
    }
    
    render() {
        return (
            <div>
                <CheckoutSummary 
                    ingredients={this.state.ingredients}
                    checkoutCanceled={this.checkoutCanceledHandler}
                    checkoutContinued={this.checkoutContinuedHandler} />
                <Route path={this.props.match.url + "/contact-data"} component={ContactData} />
            </div>
        )
    }
}

export default Checkout;
