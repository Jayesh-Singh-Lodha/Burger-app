import React from "react";
import classes from "./NavigationItems.module.css"
import NavigationItem from "../NavigationItem/NavigationItem";
import { useAuth } from "../../../../context/authContext";

const Navigationitems = (props) => {

    const {userLoggedIn}=useAuth();

return (
    <ul className={classes.NavigationItems}>
        {
            userLoggedIn?
            <NavigationItem
                link="/"
                click={props.click}
            >Logout</NavigationItem>:
            <NavigationItem
                link="/"
                click={props.click}
            >Login/Signup</NavigationItem>
        }
        <NavigationItem
            link="/burger-builder"
            click={props.click}
        >BurgerBuilder</NavigationItem>
        <NavigationItem
            link="/orders"
            click={props.click}
        >Orders</NavigationItem>
    </ul>);
};

export default Navigationitems;