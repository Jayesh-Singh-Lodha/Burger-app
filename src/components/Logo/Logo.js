import React from "react";
import Image from "../../assets/logo.png";
import classes from "./Logo.module.css"

const logo=()=>(
    <div  className={classes.Logo}>
        <img src={Image} alt="MyBuger"/>
    </div>
);

export default logo;