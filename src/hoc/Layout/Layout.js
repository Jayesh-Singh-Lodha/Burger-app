import React, { useState } from "react";
import classes from './Layout.module.css';
import Toolbar from "../../components/UI/Navigation/Toolbar/Toolbar";
import Sidedrawer from "../../components/Sidedrawer/Sidedrawer";
import { Outlet } from "react-router";
import {useAuth} from '../../context/authContext'

const Layout = (props) => {
    const [showSidedrawer, setShowSidedrawer] = useState(false);
    
    const user=useAuth();

    const sidedrawerToggleHandler = () => {
        console.log(user);
        setShowSidedrawer(prevState => !prevState.showSidedrawer);
    };

    const sidedrawerClosedHandler = () => {
        setShowSidedrawer(false);
    };

    return (
        <>
            <Toolbar toggle={sidedrawerToggleHandler} />
            <Sidedrawer
                close={sidedrawerClosedHandler}
                show={showSidedrawer}
            />
            <main className={classes.Content}>{props.children}
            </main>
                <Outlet />
        </>
    );
};

export default Layout;
