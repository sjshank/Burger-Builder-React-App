import React, { PureComponent } from 'react';
import Auxiliary from '../../hoc/Auxiliary';
import classes from "./OrderSummary.css";
import Button from ".././UI/Button/Button.js";


//const orderSummary = (props) => {
class OrderSummary extends PureComponent {

    populateIngredients = () => {
        let transfIncredients = [];
        Object.keys(this.props.incredients).forEach((key) => {
            const val = this.props.incredients[key];
            transfIncredients.push({
                label: key,
                value: val
            })
        });
        return transfIncredients;
    };
    render() {
        return (<Auxiliary>
            <h3>Your order summary</h3>
            <p>A delicious burger is having following ingredients :</p>
            <ul className={classes.incredientsList}>
                {this.populateIngredients().map((ingredient, ind) => {
                    return <li key={ingredient.label + ind}>{ingredient.label} : {ingredient.value}</li>
                })}
            </ul>
            <p><strong>Total Price : {this.props.totalPrice.toFixed(2)} INR</strong></p>
            <div className={classes.buttonSection}>
                <Button clicked={this.props.purchaseCancelled} btnType="Danger">CANCEL</Button>
                <Button clicked={this.props.purchaseBurger} btnType="Success">CONTINUE TO CHECKOUT</Button>
            </div>
        </Auxiliary>
        )
    }
}

export default OrderSummary;