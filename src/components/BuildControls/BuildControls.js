import React from "react";
import classes from "./BuildControls.css";
import BuildControl from "./BuildControl/BuildControl";

const CONTROLS = [
    { label: 'Salad', value: 'salad' },
    { label: 'Cheese', value: 'cheese' },
    { label: 'Bacon', value: 'bacon' },
    { label: 'Meat', value: 'meat' }
];

const buildControls = (props) => (
    <div className={classes.buildControls}>
        {CONTROLS.map((control, ind) => {
            return <BuildControl
                label={control.label}
                value={control.value}
                key={control + ind}
                add={props.incredientsAdded}
                remove={props.incredientsRemoved} />
        })}
    </div>
)

export default buildControls;