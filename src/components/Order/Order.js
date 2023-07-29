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
      style={{
        textTransform: 'capitalize',
        display: 'inline-block',
        // width:'40%',
        margin: '5px 8px',
        border: '1px solid #ccc',
        padding: '5px'
      }}
    >{ig.name} ({ig.amount})</span>
  })

  return (
    <div className={classes.Order}>
      <p>Ingredients:<br/> {ingredientsOutput}</p>
      <p>Total price: <strong>Rs.{props.totalPrice}</strong></p>
    </div>
  )
}
