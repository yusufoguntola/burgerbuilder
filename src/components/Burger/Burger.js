import React from 'react';

import styles from './Burger.css'

import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) => {
    let transformedIngredient = Object.keys(props.ingredients).map(igKey => {
        return [...Array(props.ingredients[igKey])].map((_, i) => {
            return <BurgerIngredient type={igKey} key={igKey + i}/>
        })
    }).reduce((arr, el) => {return arr.concat(el)}, []);
    if(transformedIngredient.length === 0){
        transformedIngredient = <p>Start adding ingredients</p>;
    }
    return (
        <div className={styles.Burger}>
            <BurgerIngredient type="bread-top"/>
            {transformedIngredient}
            <BurgerIngredient type="bread-bottom"/>
        </div>
    )
};

export default burger;