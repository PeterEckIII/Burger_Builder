import React from 'react'
import classes from "./NavigationItems.css";
import NavigationItem from "./NavigationItem/NavigationItem";

const NavigationItmes = ( props ) => (
    <ul className={classes.NavigationItems}> 
        <NavigationItem link="/" active>Burger Builder</NavigationItem>
        <NavigationItem lin="/">Checkout</NavigationItem>
    </ul>
)

export default NavigationItmes;
