import React from 'react'
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import classes from "./SideDrawer.css";
import Backdrop from "../../UI/Backdrop/Backdrop";
import Aux from "../../../HOC/Aux/Aux";

const SideDrawer = ( props ) => {
    let attachedClasses = [classes.SideDrawer, classes.Closed];
    if (props.opened) {
        attachedClasses = [classes.SideDrawer, classes.Open]
    }

    return (
        <Aux>
            <Backdrop show={props.opened} clicked={props.closed} />
            <div className={attachedClasses.join(" ")}>
                <div className={classes.Logo}> 
                    <Logo />
                </div>
                <nav>
                    <NavigationItems />
                </nav>
            </div>
        </Aux>
    );
}

export default SideDrawer;
