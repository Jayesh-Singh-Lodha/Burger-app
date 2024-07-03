import React from "react";
import classes from './Burger.module.css'
import BurgerIngredients from "./BurgerIngredients.js/BurgerIngredients";

const Burger=(props)=>{
    let transformedIngred=Object.keys(props.ingredients)
        .map(igKey=>{
            // console.log(igKey);
            return [...Array(props.ingredients[igKey])].map((_,i)=>{
                // console.log(_,i);
                return <BurgerIngredients key={igKey+i} type={igKey}/>
            });
        })
        .reduce((arr,el)=>{
            return arr.concat(el);
        },[]);
    
    if(transformedIngred.length===0){
        transformedIngred=<p>Please start adding ingredients!</p>
    }

    return ( 
    <div className={classes.Burger}>
        <BurgerIngredients type='bread-top' />
         {transformedIngred}
        <BurgerIngredients type='bread-bottom' />
    </div>);
}

export default Burger;