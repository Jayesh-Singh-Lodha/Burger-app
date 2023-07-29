import React, { Component } from "react";
import CheckoutSummary from "../../../components/Order/CheckoutSummary/CheckoutSummary";
import { useNavigate, useLocation, Outlet } from "react-router";

class CheckoutWithoutRoute extends Component {

    state = {
        ingredients: null
    }

    componentWillMount() {

        console.log(this.props.location.pathname);
        const ingredients = {};
        const query = new URLSearchParams(this.props.location.search);
        for (let params of query.entries()) {
            ingredients[params[0]] = +params[1];
        }
        this.setState({ ingredients: ingredients });
    }

    CheckoutCancelHandler = () => {
        this.props.navigate('/');
    }

    CheckoutContinueHandler = () => {
        this.props.navigate("/checkout/contact-data",);
    }

    render() {
        return (
            <div>
                <CheckoutSummary
                    ingredients={this.state.ingredients}
                    CheckoutCancel={this.CheckoutCancelHandler}
                    CheckoutContinue={this.CheckoutContinueHandler}
                />
                <Outlet context={this.state.ingredients} />
            </div>
        );
    }
}

const Checkout = () => {
    const navigate = useNavigate();
    const location = useLocation();
    return <CheckoutWithoutRoute
        navigate={navigate}
        location={location}
    />
}

export default Checkout;