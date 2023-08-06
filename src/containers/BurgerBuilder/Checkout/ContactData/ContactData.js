import React, { useEffect, useState, useContext } from 'react';
import Button from '../../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import { useLocation, useNavigate } from 'react-router';
import axios from "../../../../axios-order";
import Spinner from '../../../../components/UI/Spinner/Spinner';
import Input from '../../../../components/UI/Input/Input';
import { MyContext } from '../../../../hoc/Layout/Layout';

const ContactData = (props) => {

  const location = useLocation();
  const navigate = useNavigate();
  const { userId } = useContext(MyContext);

  const orderForm = {

    name: {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        placeholder: 'Your Name'
      },
      value: '',
      isValidation: false,
      isRequired: true
    },
    email: {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        placeholder: 'Email'
      },
      value: '',
      isValidation: false,
      isRequired: true
    },
    address: {
      elementType: 'text',
      elementConfig: {
        type: 'text',
        placeholder: 'Address'
      },
      value: '',
      isValidation: false,
      isRequired: true
    },
    city: {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        placeholder: 'City'
      },
      value: '',
      isValidation: false,
      isRequired: true
    },
    pincode: {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        placeholder: 'Pincode'
      },
      value: '',
      isValidation: false,
      isRequired: true,
      minLength: 6,
      maxLength: 6
    },
    deliveryMethod: {
      elementType: 'select',
      elementConfig: {
        options: [
          { value: 'fastest', displayValue: 'Fastest' },
          { value: 'cheapest', displayValue: 'Cheapest' }
        ]
      },
      value: ''
    }
  }

  const [formData, setFormData] = useState(orderForm);
  const [loading, setLoading] = useState(false);
  const [ingredients, setIngredients] = useState({});
  const [totalPrice, setTotalPrice] = useState(0);
  const [invalidMsg, setInvalidMsg] = useState(null);

  useEffect(() => {
    const ingredients = {};
    let price = 0;
    const query = new URLSearchParams(location.search);
    for (let params of query.entries()) {
      if (params[0] != "totalPrice")
        ingredients[params[0]] = +params[1];
      else {
        price = params[1];
      }
    }
    setIngredients(ingredients);
    setTotalPrice(price);
  }, [location]);

  const changeHandler = (e, id) => {
    let updatedForm = {
      ...formData
    };
    let updatedField = {
      ...updatedForm[id]
    };
    updatedField.value = e.target.value;
    updatedForm[id] = updatedField;
    let updatedValid = validation(updatedField);
    updatedForm[id].isValidation = updatedValid;
    // console.log(updatedField);
    setFormData(updatedForm);
  }

  const validation = (field) => {
    let valid = true;
    if (field.isRequired) {
      valid = (field.value.trim() !== '') && valid;
    }
    if (field.maxLength) {
      valid = (field.value.length <= field.maxLength) && valid;
    }
    if (field.minLength) {
      valid = (field.value.length >= field.minLength) && valid;
    }
    return valid;
  }

  const submitHandler = (event) => {
    event.preventDefault();
    if (!userId) {
      return;
    }
    for (let keys in formData) {
      if (formData[keys].isRequired && !formData[keys].isValidation) {
        setInvalidMsg(<p
          className={classes.InvalidEntry}
        ><span style={{ textTransform: 'capitalize' }}>{keys}</span> is invalid
        </p>);
        return;
      }
    }
    setLoading(true);
    let customerDetails = {};
    for (let fieldID in formData) {
      customerDetails[fieldID] = formData[fieldID].value;
    }

    const currentDate = new Date();
    const time = {
      day: currentDate.getDate(),
      month: currentDate.getMonth(),
      hours: currentDate.getHours(),
      minutes: currentDate.getMinutes(),
      year: currentDate.getFullYear()
    };

    const order = {
      ingredients: ingredients,
      totalPrice: totalPrice,
      customerDetails: customerDetails,
      time: time
    };

    axios.post('/users/'+userId+'/orders.json', order)
      .then(response => {
        console.log('/users/'+{userId}+'/orders.json');
        setLoading(false);
        navigate("/burger-builder");
        alert("Your order has been placed successfully")
      })
      .catch(error => {
        // console.log(error);
        setLoading(false);
      });
  }

  let body = null;
  let orderItemsArray = [];
  let userLoggedin = userId ? null :
    <p className={classes.InvalidEntry}>You are not logged in</p>;

  for (let keys in formData) {
    orderItemsArray.push({
      id: keys,
      config: formData[keys]
    });
  }

  body = (
    <div className={classes.ContactData}>
      <h3>Enter your contact details</h3>
      <form onSubmit={submitHandler}>
        {orderItemsArray.map(element => (
          <Input
            elementType={element.config.elementType}
            elementConfig={element.config.elementConfig}
            value={element.config.value}
            key={element.id}
            changed={(event) => changeHandler(event, element.id)}
          />
        ))}
        {invalidMsg}
        {userLoggedin}
        <Button type="Success">ORDER</Button>
      </form>
    </div>
  );

  if (loading) {
    body = <Spinner className={classes.Spinner} />;
  }

  return (
    <>
      {body}
    </>
  );
};

export default ContactData;