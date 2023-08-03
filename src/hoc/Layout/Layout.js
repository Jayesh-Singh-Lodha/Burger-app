import React, { useState } from "react";
import classes from './Layout.module.css';
import Toolbar from "../../components/UI/Navigation/Toolbar/Toolbar";
import Sidedrawer from "../../components/Sidedrawer/Sidedrawer";
import { Outlet } from "react-router";

const Layout = (props) => {
    const [showSidedrawer, setShowSidedrawer] = useState(false);

    const sidedrawerToggleHandler = () => {
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
