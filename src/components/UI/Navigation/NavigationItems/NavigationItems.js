import React from "react";
import classes from "./NavigationItems.module.css"
import NavigationItem from "../NavigationItem/NavigationItem";

const navigationitems = (props) => (
    <ul className={classes.NavigationItems}>
        <NavigationItem link="/" click={props.click}>BurgerBuilder</NavigationItem>
        <NavigationItem link="/orders" click={props.click}>Orders</NavigationItem>
    </ul>
);

export default navigationitems;