import React from 'react'
import Burger from '../../Burger/Burger'
import Button from '../../UI/Button/Button'
import classes from './CheckoutSummary.module.css'

const checkoutSummary = (props) => {
  return (
    <div className={classes.CheckoutSummary}>
      <h1>Here is your customised Burger!</h1>
      <div style={{ width: '100%', margin: 'auto' }}>
        <Burger ingredients={props.ingredients} />
      </div>
      <Button
        type='Success'
        click={props.CheckoutContinue}
      >CONTINUE</Button>
      <Button
        type='Danger'
        click={props.CheckoutCancel}
      >CANCEL</Button>
    </div>
  )
}

export default checkoutSummary;

