import React, { Component } from 'react'
import Burger from '../../Burger/Burger'
import BuildControls from '../../Burger/BuildControls/BuildControls'
import Modal from '../../UI/Modal/Modal'

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
    totalPrice: 4,
    purchasable: false

  }

  updatePurchaseState = (ingredients) => {
 
    const sum = Object.values(ingredients)
    .reduce((sum, el) => {
      return sum + el
    }, 0)

    this.setState({purchasable: sum > 0})

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
    this.updatePurchaseState(updatedIngredients)
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
    this.updatePurchaseState(updatedIngredients)
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
      <Modal />
      <Burger ingredients={this.state.ingredients}/>
      <BuildControls 
      ingredientAdded={this.addIngredientHandler}
      ingredientRemoved={this.removeIngredientHandler}
      disabled={disabledInfo}
      purchasable={this.state.purchasable}
      price={this.state.totalPrice}
      />
      </>
    )

  }
}

export default BurgerBuilder
