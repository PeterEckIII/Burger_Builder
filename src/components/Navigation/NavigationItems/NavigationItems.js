import React from 'react'
import classes from "./NavigationItems.css";
import NavigationItem from "./NavigationItem/NavigationItem";

const NavigationItmes = ( props ) => (
    <ul className={classes.NavigationItems}> 
        <NavigationItem link="/">Burger Builder</NavigationItem>
        <NavigationItem link="/orders">Orders</NavigationItem>
    </ul>
)

export default NavigationItmes;
