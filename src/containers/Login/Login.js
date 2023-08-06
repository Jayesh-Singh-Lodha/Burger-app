import React, { useState, useContext } from 'react';
import classes from './Login.module.css';
import axios from '../../axios-order';
import Axios from 'axios';
import { useNavigate } from 'react-router';
import { MyContext } from '../../hoc/Layout/Layout';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../components/UI/Spinner/Spinner';

const Login = () => {
    const [signup, setSignup] = useState(true);
    const [login, setLogin] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userExist, setUserExist] = useState(null);
    const [inputsValidMsg, setInputsValidMsg] = useState(null);
    const [loading, setLoading] = useState(false);
    const { setUserName, setUserEmail, setUserId } = useContext(MyContext);
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        // Add your login logic here (e.g., API call, authentication)
    };

    const cancelHandler = () => {
        setSignup(!signup);
        setLogin(!login);
    }

    const successHandler = () => {
        if (signup) {
            if (!name || !password || !email) {
                setInputsValidMsg("Fill all details");
                return;
            }
            setLoading(true);
            const userDetails = {
                email: email,
                password: password,
                name: name
            }
            axios.post("/users.json", userDetails).then(response => {
                console.log(response);
                setUserName(name);
                setUserEmail(email);
                setUserId(response.data.name)
                setLoading(false);
                navigate('/burger-builder');
            })
                .catch(error => {
                    setLoading(false);
                    console.log(error);
                });
            return;
        }

        if (!email || !password) {
            setInputsValidMsg("Fill all details");
            return;
        }
        setLoading(true);
        axios.get("/users.json").then(response => {
            const usersInfo = [];
            for (let userKey in response.data)
                usersInfo.push({
                    email: response.data[userKey].email,
                    password: response.data[userKey].password,
                    name: response.data[userKey].name,
                    id: userKey
                })

            // console.log(usersInfo);
            for (let i = 0; i < usersInfo.length; i++) {
                if (usersInfo[i].email === email && usersInfo[i].password === password) {
                    setUserExist(null);
                    setUserName(usersInfo[i].name);
                    setUserEmail(usersInfo[i].email);
                    setUserId(usersInfo[i].id);
                    console.log(usersInfo[i].id);
                    navigate('/burger-builder');
                    return;
                }
            }
            setUserExist("User does not exist");
            setLoading(false);
        })
            .catch(error => {
                console.log(error);
                setLoading(false);
            });
    }

    let successBtn = null;
    let cancelBtn = null;

    if (signup) {
        successBtn = "Signup";
        cancelBtn = "Already have an account";
    }
    else {
        successBtn = "Login";
        cancelBtn = "Don't have an account";
    }

    let loginForm = <Spinner />
    if (!loading) {
        loginForm = (
        <div className={classes.LoginContainer}>
            <form className={classes.LoginForm} onSubmit={handleLogin}>
                <h1>{successBtn}</h1>
                <input
                    type="name"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    style={{ display: signup ? 'inline-block' : 'none' }}
                    noValidate
                    autoComplete='off'
                />
                <input
                    type="text"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    noValidate
                    autoComplete='off'
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    noValidate
                    autoComplete='off'
                />
                <p className={classes.InvaildMsg}>{userExist}</p>
                <p className={classes.InvaildMsg}>{inputsValidMsg}</p>
                <button
                    type="button"
                    onClick={successHandler}
                >{successBtn}</button>
                <button
                    type="button"
                    onClick={cancelHandler}
                >{cancelBtn}
                </button>
            </form>
            </div>
        );
    }

    return (
        <>
            {loginForm}
        </>
    );
};

export default withErrorHandler(Login, Axios);



