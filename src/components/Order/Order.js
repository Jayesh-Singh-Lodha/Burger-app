import React from 'react'
import classes from './Order.module.css'

export default function Order(props) {

  const ingredients = [];
  for (let ingredientsName in props.ingredients) {
    ingredients.push({
      name: ingredientsName,
      amount: props.ingredients[ingredientsName]
    })
  }

  const ingredientsOutput = ingredients.map((ig) => {
    return <span key={ig.name}
    >{ig.name} ({ig.amount})</span>
  })

  return (
    <div className={classes.Order}>
      <h3 >Ordered for: {props.name}</h3>
      <p style={{fontWeight:'bold'}}>Ordered on {props.time.day}/{props.time.month}/{props.time.year} at {props.time.hours}:{props.time.minutes}</p>
      <p className={classes.Ingredients}>Ingredients:<br/> {ingredientsOutput}</p>
      <p>Total price: <strong>Rs.{props.totalPrice}</strong></p>
    </div>
  )
}
