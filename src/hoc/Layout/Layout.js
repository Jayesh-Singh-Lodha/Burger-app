import React, { Component } from "react";
import classes from './Layout.module.css'
import Toolbar from "../../components/UI/Navigation/Toolbar/Toolbar";
import Sidedrawer from "../../components/Sidedrawer/Sidedrawer";
import { Outlet } from "react-router";

class Layout extends Component {
    state = {
        showSidedrawer: false
    };

    SidedrawerToggleHandler = () => {
    this.setState((prevstate)=>{
        return {showSidedrawer:!prevstate.showSidedrawer};
    });
    }

    SidedrawerClosedHandler = () => {
    this.setState({showSidedrawer:false});
    }

    render() {
        return (
            <>
                <Toolbar toggle={this.SidedrawerToggleHandler} />
                <Sidedrawer
                    close={this.SidedrawerClosedHandler}
                    show={this.state.showSidedrawer}
                />
                <main className={classes.Content}>
                    {this.props.children}
                </main>
                <Outlet/>
            </>
        );
    }
}

export default Layout;