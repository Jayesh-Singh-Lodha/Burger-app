import React from 'react'
import classes from './Input.module.css'

const input = (props) => {

  let input = null;

  switch (props.elementType) {
    case ('text'):
      input = <input
        className={classes.InputElement}
        value={props.value}
        onChange={props.changed}
        {...props.elementConfig}
        noValidate
        autoComplete='off'
      />;
      break;
    case ('text-area'):
      input = <textarea
        className={classes.InputElement}
        value={props.value}
        onChange={props.changed}
        {...props.elementConfig}
        noValidate
        autoComplete='off'
      />;
      break;
    case ('select'):
      input = <select
        className={classes.InputElement}
        onChange={props.changed}
        value={props.value}>
        {props.elementConfig.options.map(option =>
          <option
            key={option.value}
            value={option.value}
            className={classes.Option}
          >{option.displayValue}
          </option>
        )
        }
      </select>;
      break;
    default:
      input = <input
        className={classes.InputElement}
        value={props.value}
        onChange={props.changed}
        {...props.elementConfig}
        noValidate
        autoComplete='off'
      />;
      break;
  }

  return (
    <div className={classes.Input}>
      <label className={classes.Label}>{props.label}</label>
      {input}
    </div>
  )
}

export default input