import React, { useState, useEffect, createContext } from "react";
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../axios-order";
import Axios from "axios";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import { useNavigate } from "react-router-dom";


const INGREDIENT_PRICES = {
    salad: 10,
    bacon: 20,
    cheese: 30,
    meat: 50
};

const BurgerBuilder = () => {
    const [ingredients, setIngredients] = useState({});
    const [totalPrice, setTotalPrice] = useState(10);
    const [isPurchaseable, setIsPurchaseable] = useState(false);
    const [purchasing, setPurchasing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true);
        axios.get('https://myburgerapp-7e6fd-default-rtdb.firebaseio.com/Ingredients.json')
            .then(response => {
                setIngredients(response.data);
                setLoading(false);
            })
            .catch(error => {
                setError(true);
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        setIsPurchaseable(checkPurchaseable(ingredients));
    }, [ingredients]);

    const checkPurchaseable = (ingredients) => {
        const sum = Object.values(ingredients)
            .reduce((sum, el) => {
                return sum + el;
            }, 0);
        return sum > 0;
    };

    const addIngredientsHandler = (type) => {
        const oldNumber = ingredients[type];
        const newNumber = oldNumber + 1;
        const newIngredients = {
            ...ingredients
        };
        const oldPrice = totalPrice;
        const newPrice = oldPrice + INGREDIENT_PRICES[type];
        newIngredients[type] = newNumber;
        setIngredients(newIngredients);
        setTotalPrice(newPrice);
        setIsPurchaseable(checkPurchaseable(newIngredients));
    };

    const removeIngredientsHandler = (type) => {
        if (ingredients[type] === 0) return;
        const oldNumber = ingredients[type];
        const newNumber = oldNumber - 1;
        const newIngredients = {
            ...ingredients
        };
        const oldPrice = totalPrice;
        const newPrice = oldPrice - INGREDIENT_PRICES[type];
        newIngredients[type] = newNumber;
        setIngredients(newIngredients);
        setTotalPrice(newPrice);
        setIsPurchaseable(checkPurchaseable(newIngredients));
    };

    const ordered = () => {
        setPurchasing(prevState => !prevState);
    };

    const continueCheckoutHandler = () => {
        const queryParams = [];

        for (let i in ingredients) {
            queryParams.push(encodeURI(i) + '=' + encodeURI(ingredients[i]));
        }

        queryParams.push("totalPrice=" + totalPrice);
        const queryString = queryParams.join('&');
        navigate({
            pathname: '/checkout',
            search: '?' + queryString
        });
    };

    const disabledInfo = {
        ...ingredients
    };

    for (let key in disabledInfo) {
        disabledInfo[key] = disabledInfo[key] <= 0;
    }

    let orderSummary = null;
    let burger = error ? <p>Ingredients can't be found</p> : <Spinner />;

    if (!loading) {
        burger = (
            <div>
                <Burger ingredients={ingredients} />
                <BuildControls
                    addIngredients={addIngredientsHandler}
                    removeIngredients={removeIngredientsHandler}
                    disableBtn={disabledInfo}
                    price={totalPrice.toFixed(2)}
                    purchaseable={isPurchaseable}
                    purchase={ordered}
                />
            </div>
        );

        orderSummary = (
            <OrderSummary
                ingredients={ingredients}
                continue={continueCheckoutHandler}
                cancel={ordered}
                price={totalPrice}
            />
        );
    }

    // if (loading) {
    //     orderSummary = <Spinner />;
    // }

    return (
        <>
            <Modal show={purchasing} click={ordered}>
                {orderSummary}
            </Modal>
            {burger}
        </>
    );
};

export default withErrorHandler(BurgerBuilder, axios);

