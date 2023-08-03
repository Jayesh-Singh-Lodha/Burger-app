import React, { useState, useEffect } from "react";
import CheckoutSummary from "../../../components/Order/CheckoutSummary/CheckoutSummary";
import { useNavigate, useLocation, Outlet } from "react-router-dom";

const Checkout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [ingredients, setIngredients] = useState({});

  useEffect(() => {
    const ingredients = {};
    const query = new URLSearchParams(location.search);
    for (let params of query.entries()) {
      ingredients[params[0]] = +params[1];
    }
    setIngredients(ingredients);
  }, [location]);

  const checkoutCancelHandler = () => {
    navigate("/");
  };

  const checkoutContinueHandler = () => {
    navigate("/checkout/contact-data");
  };

  return (
    <div>
      <CheckoutSummary
        ingredients={ingredients}
        checkoutCancel={checkoutCancelHandler}
        checkoutContinue={checkoutContinueHandler}
      />
      <Outlet context={ingredients} />
    </div>
  );
};

export default Checkout;
