import React from "react";
import classes from "./Burger.css";
import BurgerIncredients from "../BurgerIncredients/BurgerIncredients";

const burger = (props) => {
    let transfIncredients = [];
    Object.keys(props.incredients).forEach((key) => {
        const val = props.incredients[key];
        for (let i = 0; i < val; i++) {
            transfIncredients.push(key);
        }
    });
    return (
        <div className={classes.Burger}>
            <BurgerIncredients type="bread-top"></BurgerIncredients>

            {transfIncredients.length > 0 ? transfIncredients.map((inc, ind) => {
                return <BurgerIncredients key={inc + ind} type={inc} />
            }) : <p className={classes.incredientsInfo}>Please start adding ingredients !</p>}

            <BurgerIncredients type="bread-bottom"></BurgerIncredients>
        </div>
    )
}

export default burger;