import React from "react";
import classes from "./BuildControl.module.css"

const buildControl = (props) => (
    <div className={classes.BuildControl}>
        <div className={classes.Label}>{props.label}</div>
        <button
            className={classes.More}
            onClick={props.AddIngredient}
            style={{fontWeight:'bold'}}
        >
        +</button>
        <button
            className={classes.Less}
            onClick={props.RemoveIngredient}
            disabled={props.Disable}
            style={{fontWeight:'bold'}}
        >-</button>
    </div>
);

export default buildControl;