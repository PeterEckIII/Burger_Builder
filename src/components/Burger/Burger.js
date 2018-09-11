import React from "react";
import classes from "./Burger.css";
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";

const Burger = ( props ) => {
    // Dynamically rendering ingredients
    let newIngredients = Object.keys(props.ingredients).map(ingredientKey => {
        return [...Array(props.ingredients[ingredientKey])].map((_, i) => {
            return <BurgerIngredient key={ingredientKey + i} type={ingredientKey} />
        });
    }).reduce((acc, next) => {
        return acc.concat(next);
    }, []);

    if (newIngredients.length === 0) {
        newIngredients = <p>Please start adding ingredients!</p>
    }
    console.log(newIngredients);
    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top" />
            {newIngredients}
            <BurgerIngredient type="bread-bottom" />
        </div>
    );
};

export default Burger;
