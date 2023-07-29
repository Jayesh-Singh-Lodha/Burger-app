import React from "react";
import Logo from "../Logo/Logo"
import NavigationItems from "../UI/Navigation/NavigationItems/NavigationItems"
import classes from "./Sidedrawer.module.css"
import Backdrop from '../UI/Backdrop/Backdrop'

const sidedrawer = (props) => {

    let attachedClasses=[classes.Sidedrawer,classes.Close];
    if(props.show){
        attachedClasses=[classes.Sidedrawer,classes.Open];
    }

    return (
        <>
            <Backdrop show={props.show} click={props.close}/>
            <div className={attachedClasses.join(' ')}>
                <div className={classes.Logo}>
                    <Logo />
                </div>
                <nav>
                    <NavigationItems click={props.close}/>
                </nav>
            </div>
        </>
    );
}

export default sidedrawer;