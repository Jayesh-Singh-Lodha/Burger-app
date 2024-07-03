import React, { useState } from 'react';
import classes from './Login.module.css';
import axios from '../../axios-order'
import { useNavigate } from 'react-router';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../components/UI/Spinner/Spinner';

import { useAuth } from '../../context/authContext';
import { doCreateUserWithEmailAndPassword, doSignInWithEmailAndPassword ,doLogout} from '../../firebase/Auth';

const Login = () => {
    const [signup, setSignup] = useState(true);
    const [login, setLogin] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [inputsValidMsg, setInputsValidMsg] = useState(null);
    const [loading, setLoading] = useState(false);
    const {userLoggedIn}=useAuth();
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
    };

    const cancelHandler = () => {
        setSignup(!signup);
        setLogin(!login);
    }

    const successHandler = async() => {
        if (signup) {
            if (!password || !email) {
                setInputsValidMsg("Fill all details");
                return;
            }
            setLoading(true);
            try{
                await doCreateUserWithEmailAndPassword(email,password);
                console.log("User created successfully");
                navigate('/burger-builder')
            }
            catch(error){
                console.log(error);
                setInputsValidMsg(error.message);
            }
            setLoading(false);
            
            return;
        }

        if (!email || !password) {
            setInputsValidMsg("Fill all details");
            return;
        }
        setLoading(true);
        try{
            await doSignInWithEmailAndPassword(email,password);
            console.log('User Logged in');
            navigate('/burger-builder')
        }
        catch(error){
            console.log(error.message);
            setInputsValidMsg(error.message);
        }
        setLoading(false);
    }

    const logoutHandler=async()=>{
            setLoading(true);
            try{
                await doLogout();
                console.log("User logged out");
            }
            catch(error){
                setInputsValidMsg(error.message);
            }
            setLoading(false);
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

    let logout = (
        <div className={classes.LoginContainer}>
        <form className={classes.LoginForm} onSubmit={handleLogin}>
        <button onClick={logoutHandler}>Logout</button>
        </form>
        </div>
    );

    return (
        <>
           {!userLoggedIn? loginForm: logout}
        </>
    );
};

export default withErrorHandler(Login, axios);



