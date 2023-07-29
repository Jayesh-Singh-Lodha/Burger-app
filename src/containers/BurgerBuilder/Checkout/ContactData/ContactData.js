import React, { Component } from 'react'
import Button from '../../../../components/UI/Button/Button'
import classes from './ContactData.module.css'

class ContactData extends Component {
  render() {
    return (
      <div className={classes.ContactData}>
        <h4>Enter your contact details</h4>
        <form action="">
          <input className={classes.Input} type="text" name='name' placeholder='Enter your name' />
          <input className={classes.Input} type="email" name='email' placeholder='Enter your email' />
          <input className={classes.Input} type="text" name='street' placeholder='Street' />
          <input className={classes.Input} type="text" name='postal' placeholder='Postal' />
          <Button type="Success">ORDER</Button>
        </form>
      </div>
    )
  }
}

export default ContactData;

