import React, { createContext, useState } from "react";
import classes from './Layout.module.css';
import Toolbar from "../../components/UI/Navigation/Toolbar/Toolbar";
import Sidedrawer from "../../components/Sidedrawer/Sidedrawer";
import { Outlet } from "react-router";

const MyContext=createContext();

const Layout = (props) => {
    const [showSidedrawer, setShowSidedrawer] = useState(false);
    // const [userLogged,setUserLogged]=useState(false);
    const [userName,setUserName]=useState(null);
    const [userEmail,setUserEmail]=useState(null);
    const [userId,setUserId]=useState(null);

    const sidedrawerToggleHandler = () => {
        setShowSidedrawer(prevState => !prevState.showSidedrawer);
    };

    const sidedrawerClosedHandler = () => {
        setShowSidedrawer(false);
    };

    return (
        <MyContext.Provider value={{userName,userEmail,userId,setUserName,setUserEmail,setUserId}}>
            <Toolbar toggle={sidedrawerToggleHandler} />
            <Sidedrawer
                close={sidedrawerClosedHandler}
                show={showSidedrawer}
            />
            <main className={classes.Content}>{props.children}
            </main>
                <Outlet />
        </MyContext.Provider>
    );
};

export default Layout;
export {MyContext};
