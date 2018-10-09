import React, { Component } from 'react';
import Button from "../../../components/UI/Button/Button";
import classes from "./ContactData.css";
import axios from "../../../axios-orders";
import Spinner from "../../../components/UI/Spinner/Spinner";

class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            zipCode: ''
        },
        loading: false
    }

    orderHandler = (event) => {
        event.preventDefault();
        this.setState({ loading: true });
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            // Dummy order data
            customer: {
                name: 'Peter Eck',
                address: {
                    street: '3011 Drury Lane',
                    zipCode: '50693',
                    country: 'United States'
                },
                email: 'test@test.com'
            },
            deliveryMethod: 'ASAP'
        }
        axios.post("/orders.json", order)
            .then(response => {
                this.setState({ loading: false });
                this.props.history.push("/");
            }).catch(error => {
                this.setState({ loading: false });
            });
    }

    render() {
        let form = (
            <form>
                <input className={classes.Input} type="text" name="name" placeholder="Your Name" />
                <input className={classes.Input} type="email" name="email" placeholder="Your Email" />
                <input className={classes.Input} type="text" name="street" placeholder="Your Street Address" />
                <input className={classes.Input} type="text" name="zipCode" placeholder="Zip Code" />
                <Button clicked={this.orderHandler} btnType="Success">ORDER</Button>
            </form>
        );
        if (this.state.loading) {
            form = <Spinner />
        }
        return (
            <div className={classes.ContactData}>
                <h4>Your Information: </h4>
                { form }
            </div>
        );
    }
}


export default ContactData;
