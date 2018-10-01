import React, { Component } from 'react';
import Aux from "../../../HOC/Aux/Aux";
import Backdrop from "../Backdrop/Backdrop";
import classes from "./Modal.css";

class Modal extends Component {

    // Added the below methods because the Modal wraps the OrderSummary component, which was rendering unnecessarily, causing performance issues
    shouldComponentUpdate( nextProps, nextState ) {
        if (nextProps.show !== this.props.show) {
            return true;
        }
    }

    componentWillUpdate() {
        console.log("[Modal] WillUpdate");
    }

    render() {
        return (
            <Aux>
                <Backdrop show={this.props.show} clicked={this.props.modalClosed} />
                <div 
                    className={classes.Modal}
                    style={{
                        transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                        opacity: this.props.show ? '1' : '0'
                    }}>
                    {this.props.children}
                </div>
            </Aux>
        )
    }
}

export default Modal;
