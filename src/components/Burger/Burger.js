import React from 'react';
import styles from './Burger.module.css'
import BurgerIngredient from './BurgerIngredient/BurgerIngredient'

const Burger = (props) => {

  let transformedIngredients = Object.keys(props.ingredients)
    .map(ingKey => {
      return [...Array(props.ingredients[ingKey])].map((_, i) => {
        return <BurgerIngredient key={ingKey + i} type={ingKey} />
      })
    })
    .reduce((arr, el) => {
      return arr.concat(el)
    }, [])
    if (transformedIngredients.length === 0) {
      transformedIngredients = <p>Please add ingredients</p>
    }

  return (

    <div className={styles.burger} style={{ width: props.width }}>
      <BurgerIngredient type="bread-top"/>
      {transformedIngredients}
      <BurgerIngredient type="bread-bottom" />
    </div>

  )

}

export default Burger
