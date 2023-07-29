import React from "react";
import classes from "./NavigationItem.module.css"
import { NavLink } from "react-router-dom";

const navigationitem = (props) => (
    < li className={classes.NavigationItem} >
        <NavLink
            to={props.link}
            onClick={props.click}
        >{props.children}
        </NavLink>
    </ li>
);

export default navigationitem;