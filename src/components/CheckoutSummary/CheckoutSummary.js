import React, { Component } from 'react';
import classes from "./CheckoutSummary.css";
import Button from ".././UI/Button/Button";

class CheckoutSummary extends Component {

    render() {
        return (<div>
            <h2>All set to go !</h2>
            <div>
                <h4>Your Order details are as follow :</h4>
                <ul className={classes.incredientsList}>
                    {this.props.ingredients.map((ingredient, ind) => {
                        return <li key={ingredient.label + ind}>{ingredient.label} : {ingredient.value}</li>
                    })}
                </ul>
                <p><strong>Total Price : {this.props.price} INR</strong></p>
            </div>
            <div className={classes.buttonSection}>
                <Button clicked={this.props.purchaseCancelled} btnType="Danger">CANCEL</Button>
                <Button clicked={this.props.purchaseBurgerConfirmation} btnType="Success">CHECKOUT</Button>
            </div>
        </div >
        )
    }
}

export default CheckoutSummary;