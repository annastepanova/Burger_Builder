import React from 'react'
import styles from './Order.module.css'

const Order = (props) => {

  const ingredients = []
  for (let ingredient in props.ingredients) {
    ingredients.push({name: ingredient, amount: props.ingredients[ingredient]})
  }

  const ingredientOutput = ingredients.map(ing => {
    return (
      <span className={styles.span} key={ing.name}>{ing.name} ({ing.amount})</span>
    )
  })

  return (
    <div className={styles.order}>
      <p>Ingredients: {ingredientOutput}</p>
      <p>Price: <strong>USD {Number(props.price).toFixed(2)}</strong></p>
    </div>
  )
}

export default Order