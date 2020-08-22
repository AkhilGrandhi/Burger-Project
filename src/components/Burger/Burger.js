import React from 'react';
import classes from './Burger.module.css';
import BurgerIngredient from './BurgerIngredients/BurgerIngredient';

const burger = (props) => {

    // 1.Here we Created transIngred array using ingredients from BurgerInredients
    // 2. First splitting arrays of array 1st map [salabArr[2],meatArr[1],..]
    // 3.Splliting arraya inside array 2nd map [salabArr1,salabArr2,meatArr1,..]  
    // 4.Try console log to be cleared
    let transformedIngredients = Object.keys(props.ingredients)
    .map(igKey => {
        return [...Array(props.ingredients[igKey])].map((_,i) => {
            
            return <BurgerIngredient key={igKey + i} type={igKey} />
        });
        
    }).reduce((arr,el)=> {
        return arr.concat(el);
    }, []);
    if(transformedIngredients.length === 0){
        transformedIngredients = <p>Select Ingredients</p>
    }
    // console.log(transformedIngredients);

    //Returning Burger with top and bottom part and middle part as dynamic (user based input)
    return(
        <div className={classes.Burger}>
            <BurgerIngredient type = "bread-top" />
            {transformedIngredients}
            <BurgerIngredient type = "bread-bottom" />
            
        </div>
    );
};

export default burger;