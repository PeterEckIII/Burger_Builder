import React, { Component } from "react";
import Aux from "../../HOC/Aux";
import Toolbar from "../Navigation/Toolbar/Toolbar";
import SideDrawer from "../Navigation/SideDrawer/SideDrawer";
import classes from "./Layout.css"

class Layout extends Component {
    state= {
        showSideDrawer: true
    }

    sideDrawerClosedHandler = () => {
        this.setState({showSideDrawer: false});
    }

    sideDrawerToggleHandler = () => {
        this.setState((prevState) => {
            return {showSideDrawer: !this.state.showSideDrawer};
        });
    }

    render () {
       return (
        <Aux>
            <Toolbar drawerToggleClicked={this.sideDrawerToggleHandler} />
            <SideDrawer 
                opened={this.state.showSideDrawer} 
                closed={this.sideDrawerClosedHandler}
             />
            <main className={classes.Content}>
                {this.props.children}
            </main>
        </Aux>  
       )
   }
}

export default Layout;
