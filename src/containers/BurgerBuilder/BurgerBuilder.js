import React, { Component } from "react";
import { connect } from "react-redux";

import Aux from "../../HOC/Aux/Aux";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../../src/components/UI/Spinner/Spinner";
import withErrorHandler from "../../HOC/withErrorHandler/withErrorHandler";
import axios from "../../axios-orders";
import * as actionTypes from "../../store/actions";

const INGREDIENT_PRICES = {
    lettuce: 0.3,
    cheese: 0.75,
    meat: 2,
    bacon: 1.5
}
class BurgerBuilder extends Component {
    state = {
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        loading: false,
        error: false
    }

    componentDidMount() {
        // axios.get("https://burger-builder-8ddbe.firebaseio.com/ingredients.json")
        //     .then(response => {
        //         this.setState({ ingredients: response.data });
        //     }).catch(error => {
        //         this.setState({ error: true });
        //     });
    }

    updatePurchaseState (ingredients) {
        const sum = Object.keys(ingredients).map(igKey => {
            return ingredients[igKey];
        }).reduce((acc, next) => {
            return acc + next;
        }, 0);
        this.setState({purchasable: sum > 0});
    }

    addIngredientHandler = ( type ) => {
        const oldCount = this.state.ingredients[type];
        const newCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = newCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
        this.updatePurchaseState(updatedIngredients);
    }

    removeIngredientHandler = ( type ) => {
        const oldCount = this.state.ingredients[type];
        // if the count is less than 1, disable the "less" button
        if (oldCount <= 0) {
            return;
        }
        const newCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = newCount;
        const priceDeduction = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;
        this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
        this.updatePurchaseState(updatedIngredients);
    }

    purchaseHandler = () => {
        this.setState({purchasing: true});
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    }

    purchaseContinueHandler = () => {
        const queryParams = [];
        for (let i in this.state.ingredients) {
            queryParams.push(encodeURIComponent(i) + "=" + encodeURIComponent(this.state.ingredients[i]));
        }
        queryParams.push('price=' + this.state.totalPrice)
        const queryString = queryParams.join("&");
        this.props.history.push({
            pathname: "/checkout",
            search: "?" + queryString
        });
    }

    render() {

        const disabledInfo = {
            ...this.props.ings
        };
        
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        let orderSummary = null 

        if (this.state.loading) {
            orderSummary = <Spinner />
        }

        let burger = this.state.error ? <p>Ingredients can't be loaded!</p> : <Spinner />

        if (this.props.ings) {
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ings} />
                    <BuildControls
                        ingredientAdded={this.props.onIngredientAdded}
                        ingredientRemoved={this.props.onIngredientRemoved}
                        disabled={disabledInfo}
                        purchasable={this.state.purchasable}
                        ordered={this.purchaseHandler}
                        price={this.state.totalPrice} />
                </Aux>
            );
            orderSummary = 
                <OrderSummary 
                    ingredients={this.props.ings}
                    purchaseCanceled={this.purchaseCancelHandler}
                    purchaseContinued={this.purchaseContinueHandler}
                    price={this.state.totalPrice} />
        }

        if (this.state.loading) {
            orderSummary = <Spinner />
        }

        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.ingredients
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: ( ingName ) => dispatch({ type: actionTypes.ADD_INGREDIENT, ingredientName: ingName }),
        onIngredientRemoved: ( ingName ) => dispatch({ type:actionTypes.REMOVE_INGREDIENT, ingredientName: ingName })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
