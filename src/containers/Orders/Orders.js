import React, { useEffect, useState } from "react";
import Order from "../../components/Order/Order";
import axios from "../../axios-order";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import Spinner from "../../components/UI/Spinner/Spinner";
import classes from "./Orders.module.css";
import { useAuth } from "../../context/authContext";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const { currentUser, userLoggedIn } = useAuth();

  useEffect(() => {
    if (!userLoggedIn) return;
    console.log(currentUser);
    setLoading(true);
    axios
      .get("/users/" + currentUser.uid + "/orders.json")
      .then((res) => {
        console.log("/users/" + currentUser.uid + "/orders.json");
        const fetchedOrders = [];
        for (let key in res.data) {
          fetchedOrders.push({
            ...res.data[key],
            id: key,
          });
        }
        setOrders(fetchedOrders);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  }, [userLoggedIn,currentUser]);

  let spinner = null;
  if (loading) {
    spinner = <Spinner />;
  }

  let content = (
    <h1 className={classes.Heading}>Please login to see your orders</h1>
  );
  if (userLoggedIn) {
    content = (
      <>
        {orders.length === 0 ? (
          <h1 className={classes.Heading}>No orders yet</h1>
        ) : (
          <h1 className={classes.Heading}>Your Orders</h1>
        )}
        {orders.map((order) => (
          <Order
            key={order.id}
            name={order.customerDetails.name}
            ingredients={order.ingredients}
            totalPrice={order.totalPrice}
            time={order.time}
          />
        ))}
      </>
    );
  }

  return (
    <>
      {content}
      {spinner}
    </>
  );
};

export default withErrorHandler(Orders, axios);
