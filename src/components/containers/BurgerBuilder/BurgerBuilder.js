import React, { Component } from 'react'
import Burger from '../../Burger/Burger'
import BuildControls from '../../Burger/BuildControls/BuildControls'
import Modal from '../../UI/Modal/Modal'
import OrderSummary from '../../Burger/OrderSummary/OrderSummary'
import Spinner from '../../UI/Spinner/Spinner'
import withErrorHandler from '../../withErrorHandler/withErrorHandler'
import axios from '../../../axios_orders'

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
    purchasable: false,
    purchasing: false,
    loading: false

  }

  updatePurchaseState = (ingredients) => {
 
    const sum = Object.values(ingredients)
    .reduce((sum, el) => {
      return sum + el
    }, 0)

    this.setState({purchasable: sum > 0})

  }

  purchaseHandler = () => {
    this.setState({purchasing: true})
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

  purchaseCancelHandler = () => {
    this.setState({purchasing: false})
  }

  purchaseContinueHandler = () => {
    // alert("You continue!")
    this.setState({loading: true})
    const order = {
      ingredients: this.state.ingredients,
      price: this.state.totalPrice,
      customer: {
        name: 'Anna Stepanova',
        address: 'Some Street 1',
        city: 'Miami',
        zipcode: '123456'
      },
      email: 'poop@mail.com',
      deliveryMethod: 'delivery'
    }
    axios.post('/orders.json', order)
    .then(response => 
      this.setState({ loading: false, purchasing: false })
      )
    .catch(error => 
      this.setState({ loading: false, purchasing: false })
      )

  }

  render() {
    const disabledInfo = {
      ...this.state.ingredients
    }
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0
    }
    let orderSummary = <OrderSummary
      ingredients={this.state.ingredients}
      purchaseCancelled={this.purchaseCancelHandler}
      purchaseContinued={this.purchaseContinueHandler}
      totalPrice={this.state.totalPrice}
    />
    if (this.state.loading) {
      orderSummary = <Spinner/>
    }

    return (
      <>
      <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
        {orderSummary}
      </Modal>
      <Burger ingredients={this.state.ingredients}/>
      <BuildControls 
      ingredientAdded={this.addIngredientHandler}
      ingredientRemoved={this.removeIngredientHandler}
      disabled={disabledInfo}
      purchasable={this.state.purchasable}
      ordered={this.purchaseHandler}
      price={this.state.totalPrice}
      />
      </>
    )

  }
}

export default withErrorHandler(BurgerBuilder, axios)
