import React, { useEffect } from "react";
import classes from "./NavigationItems.module.css"
import NavigationItem from "../NavigationItem/NavigationItem";
import { MyContext } from "../../../../hoc/Layout/Layout";
import { useContext } from "react";

const Navigationitems = (props) => {

return (
    <ul className={classes.NavigationItems}>
        <NavigationItem
            link="/"
            click={props.click}
        >Login/Signup</NavigationItem>
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