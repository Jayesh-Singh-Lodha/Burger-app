import React from "react";
import classes from "./BuildControls.module.css"
import BuildControl from "./BuildControl/BuildControl"

const controls = [
    { label: 'Salad', type: 'salad' },
    { label: 'Bacon', type: 'bacon' },
    { label: 'Cheese', type: 'cheese' },
    { label: 'Meat', type: 'meat' },
];

const buildControls = (props) => (
    <div className={classes.BuildControls}>
        <p>Burger Price: <strong>Rs.{props.price}</strong></p>
        {controls.map((ctrl) => {
            return <BuildControl
                key={ctrl.label}
                label={ctrl.label}
                AddIngredient={()=>props.addIngredients(ctrl.type)}
                RemoveIngredient={()=>props.removeIngredients(ctrl.type)}
                Disable={props.disableBtn[ctrl.type]}
                price={props.totalPrice}
            />
        }
        )}
        <button className={classes.OrderButton}
            disabled={!props.purchaseable}
            onClick={props.purchase}
        >ORDER NOW</button>
    </div>
);

export default buildControls;