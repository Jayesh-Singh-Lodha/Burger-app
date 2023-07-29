import React, { Component } from "react";
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../axios-order";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import { useNavigate} from "react-router";

const INGEDIENT_PRICES = {
    cheese: 30,
    meat: 50,
    bacon: 20,
    salad: 10
}

class BurgerBuilderWithoutRoutes extends Component {
    state = {
        ingredients: null,
        totalPrice: 10,
        isPurchaseable: false,
        purchasing: false,
        loading: false,
        error: false
    }

    componentDidMount() {
        axios.get('https://myburgerapp-7e6fd-default-rtdb.firebaseio.com/Ingredients.json')
            .then(response => {
                this.setState({ ingredients: response.data });
            })
            .catch(error => { this.setState({ error: true }) });
    }

    Purchaseable = (ingredients) => {
        const ingred = {
            ...ingredients
        };
        const sum = Object.keys(ingred)
            .map((key) => {
                return ingred[key];
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);
        this.setState({ isPurchaseable: sum > 0 });
    }

    AddIngredientsHandler = (type) => {
        const oldNumber = this.state.ingredients[type];
        const newNumber = oldNumber + 1;
        const newIngredients = {
            ...this.state.ingredients
        }
        const oldprice = this.state.totalPrice;
        const newprice = oldprice + INGEDIENT_PRICES[type];
        newIngredients[type] = newNumber;
        this.setState({ ingredients: newIngredients, totalPrice: newprice });
        // console.log(this.state.totalPrice);
        this.Purchaseable(newIngredients);
    }
    RemoveIngredientsHandler = (type) => {
        if (this.state.ingredients[type] === 0) return;
        const oldNumber = this.state.ingredients[type];
        const newNumber = oldNumber - 1;
        const newIngredients = {
            ...this.state.ingredients
        }
        const oldprice = this.state.totalPrice;
        const newprice = oldprice - INGEDIENT_PRICES[type];
        newIngredients[type] = newNumber;
        this.setState({ ingredients: newIngredients, totalPrice: newprice });
        // console.log(this.state.totalPrice);
        this.Purchaseable(newIngredients);

    }

    Ordered = () => {
        const change = this.state.purchasing;
        this.setState({ purchasing: !change })
    }

    ContinueCheckoutHandler = () => {
        // alert('Checkout page');
        this.setState({ loading: true });
        const order = {
            ingredients: this.state.ingredients,
            totalPrice: this.state.totalPrice,
            customer: {
                name: 'Jayesh',
                address: {
                    area: 'Ganesh Nager',
                    zipcode: '230241',
                    country: 'India'
                },
                email: 'jayesh@gmail.com'
            },
            deliveryMethod: 'online'
        }
        axios.post('/orders.json', order)
            .then(response => {
                console.log(response);
                this.setState({ loading: false, purchasing: false })
            })
            .catch(error => {
                console.log(error);
                this.setState({ loading: false, purchasing: false })
            });
        const queryParams=[];

        for(let i in this.state.ingredients){
            queryParams.push(encodeURI(i) +'='+ encodeURI(this.state.ingredients[i]))
        }

        const queryString=queryParams.join('&');
        this.props.navigate({
            pathname:'/checkout',
            search:'?'+queryString
        })
    }

    render() {
        const DisabledInfo = {
            ...this.state.ingredients
        };
        for (let key in DisabledInfo) {
            DisabledInfo[key] = DisabledInfo[key] <= 0;
        }

        let orderSummary = null;
        let burger = this.state.error ? <p>Ingredients can't be found</p> : <Spinner />;

        if (this.state.ingredients) {
            burger = (
                <>
                    <Burger ingredients={this.state.ingredients} />
                    <BuildControls
                        AddIngredients={this.AddIngredientsHandler}
                        RemoveIngredients={this.RemoveIngredientsHandler}
                        DisableBtn={DisabledInfo}
                        price={this.state.totalPrice.toFixed(2)}
                        Purchaseable={this.state.isPurchaseable}
                        purchase={this.Ordered}
                    />
                </>
            );
            orderSummary = (<OrderSummary
                ingredients={this.state.ingredients}
                continue={this.ContinueCheckoutHandler}
                cancel={this.Ordered}
                price={this.state.totalPrice} />);
        }
        if (this.state.loading) {
            orderSummary = <Spinner />
        }


        return (
            <>
                <Modal
                    show={this.state.purchasing}
                    click={this.Ordered}
                >
                    {orderSummary}
                </Modal>
                {burger}
            </>
        );
    }
}

const BurgerBuilder=()=>{
    const navigate=useNavigate();
    return <BurgerBuilderWithoutRoutes 
    navigate={navigate}
    />
}

export default withErrorHandler(BurgerBuilder,axios);