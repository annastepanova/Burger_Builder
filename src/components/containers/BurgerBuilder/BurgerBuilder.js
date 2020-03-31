import React, { Component } from 'react'
import Burger from '../../Burger/Burger'
import BuildControls from '../../Burger/BuildControls/BuildControls'

const INGREDIENT_PRICES = {
  salad: 1,
  cheese: 1,
  meat: 5,
  bacon: 4
}

class BurgerBuilder extends Component {

  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0
    },
    totalPrice: 4

  }

  addIngredientHandler = (type) => {
    const actualCount = this.state.ingredients[type]
    const updateCount = actualCount + 1
    const updatedIngredients = {...this.state.ingredients}
    updatedIngredients[type] = updateCount
    const priceAddition = INGREDIENT_PRICES[type]
    const oldPrice = this.state.totalPrice
    const newPrice = oldPrice + priceAddition
    this.setState({totalPrice: newPrice, ingredients: updatedIngredients})
  }

  removeIngredientHandler = (type) => {
    const actualCount = this.state.ingredients[type]
    const updateCount = actualCount - 1
    const updatedIngredients = { ...this.state.ingredients }
    updatedIngredients[type] = updateCount
    const priceDeduction = INGREDIENT_PRICES[type]
    const oldPrice = this.state.totalPrice
    const newPrice = oldPrice - priceDeduction
    this.setState({ totalPrice: newPrice, ingredients: updatedIngredients })
  }

  render() {
    const disabledInfo = {
      ...this.state.ingredients
    }
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0
    }

    return (
      <>
      <Burger ingredients={this.state.ingredients}/>
      <BuildControls 
      ingredientAdded={this.addIngredientHandler}
      ingredientRemoved={this.removeIngredientHandler}
      disabled={disabledInfo}
      price={this.state.totalPrice}
      />
      </>
    )

  }
}

export default BurgerBuilder
