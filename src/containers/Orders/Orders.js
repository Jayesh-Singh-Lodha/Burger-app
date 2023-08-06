import React, { useEffect, useState, useContext } from 'react'
import Order from '../../components/Order/Order'
import axios from '../../axios-order'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import Spinner from "../../components/UI/Spinner/Spinner"
import classes from "./Orders.module.css"
import { MyContext } from '../../hoc/Layout/Layout'

const Orders = () => {

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    const { userId } = useContext(MyContext);

    useEffect(() => {
        if(!userId)return;
        setLoading(true);
        axios.get("/users/" + userId + "/orders.json").then(res => {
            const fetchedOrders = [];
            for (let key in res.data) {
                fetchedOrders.push({
                    ...res.data[key],
                    id: key
                });
            }
            setOrders(fetchedOrders);
            setLoading(false);
        }).catch(err => {
            setLoading(false);
        });
    }, []
    )

    let spinner = null;
    if (loading) {
        spinner = <Spinner />
    }

    let content = <h1 className={classes.Heading}>Please login to see your orders</h1>;
    if (userId) {
        content = (
            <>
                <h1 className={classes.Heading}>Your Orders</h1>
                {
                    orders.map(order => (
                        <Order
                            key={order.id}
                            name={order.customerDetails.name}
                            ingredients={order.ingredients}
                            totalPrice={order.totalPrice}
                            time={order.time}
                        />
                    ))
                }
            </>
        );
    }

    return (
        <>
            {content}
            {spinner}
        </>
    )
}

export default withErrorHandler(Orders, axios);





