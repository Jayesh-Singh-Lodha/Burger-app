import React from "react";
import Button from "../../UI/Button/Button";

const orderSummary = (props) => {
    const ingredientsSummary = Object.keys(props.ingredients)
        .map(key => {
            return (<li key={key}><span style={{ textTransform: 'capitalize' }}>{key}</span> : {props.ingredients[key]}</li>);
        });
    return (
        <>
            <h2>Your order</h2>
            <p>A delicious Burger with the following ingredients :</p>
            <ul>
                {ingredientsSummary}
            </ul>
            <p><strong>GRAND TOTAL Rs. {props.price.toFixed(2)}</strong></p>
            <p>Press continue to proceed !</p>
            <div style={{width:'100%'}}>
            <Button
                type="Success"
                click={props.continue}
            >CONTINUE
            </Button>
            <Button
                type="Danger"
                click={props.cancel}
            >CANCEL
            </Button>
            </div>
        </>
    )
}

export default orderSummary;