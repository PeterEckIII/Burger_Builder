import React, { Component } from "react";
import { connect } from "react-redux";

import Aux from "../../HOC/Aux/Aux";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../../src/components/UI/Spinner/Spinner";
import withErrorHandler from "../../HOC/withErrorHandler/withErrorHandler";
import * as burgerBuilderActions from "../../store/actions/index";
import axios from "../../axios-orders";

class BurgerBuilder extends Component {
    state = {
        purchasing: false,
    }

    componentDidMount() {
        this.props.onInitIngredients();
    }

    updatePurchaseState (ingredients) {
        // Object.keys returns the keys from the ingredients object
        // We map the keys to a new array using each individual ingredient (igKey)
        const sum = Object.keys(ingredients).map(igKey => {
            return ingredients[igKey];
        }).reduce((acc, next) => {
            return acc + next;
        }, 0);
        return sum > 0;
    }

    // When user clicks on "Place Your Order"
    purchaseHandler = () => {
        console.log("From the purchaseHandler");
        this.setState({ purchasing: true });
    }

    // On modal when user clicks "Cancel"
    purchaseCancelHandler = () => {
        console.log("From the purchaseCancelHandler");
        this.setState({ purchasing: false });
    }

    // On modal when user clicks "Continue"
    purchaseContinueHandler = () => {
        console.log("From the purchaseContinueHandler");
        this.props.history.push('/checkout');
    }

    // TODO: Figure out what's going on with this disabledInfo variable...
    render() {

        const disabledInfo = {
            ...this.props.ings
        };
        console.log("Disabled info is:", disabledInfo);
        
        // Each key here is the ingredient name
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        let orderSummary = null 

        // If the data is loading show the Spinner component
        if (this.state.loading) {
            orderSummary = <Spinner />
        }

        // If there is an error show the error text. If not, load the Spinner component
        let burger = this.props.error ? <p>Ingredients can't be loaded!</p> : <Spinner />

        if (this.props.ings) {
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ings} />
                    <BuildControls
                        ingredientAdded={this.props.onIngredientAdded}
                        ingredientRemoved={this.props.onIngredientRemoved}
                        disabled={disabledInfo}
                        purchasable={this.updatePurchaseState(this.props.ings)}
                        ordered={this.purchaseHandler}
                        price={this.props.price} />
                </Aux>
            );
            orderSummary = 
                <OrderSummary 
                    ingredients={this.props.ings}
                    purchaseCanceled={this.purchaseCancelHandler}
                    purchaseContinued={this.purchaseContinueHandler}
                    price={this.props.price} />
        }

        return (
            <Aux>
                <Modal 
                    show={this.state.purchasing}
                    modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        price: state.totalPrice,
        error: state.error
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: ( ingName ) => dispatch(burgerBuilderActions.addIngredient(ingName)),
        onIngredientRemoved: ( ingName ) => dispatch(burgerBuilderActions.removeIngredient(ingName)),
        onInitIngredients: () => dispatch(burgerBuilderActions.initIngredients())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
