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
    ingredients: null,
    totalPrice: 4,
    purchasable: false,
    purchasing: false,
    loading: false,
    error: false

  }

  componentDidMount() {
    axios('https://react-app-burger-builder-6284f.firebaseio.com/ingredients.json')
    .then(response => {
      this.setState({ingredients: response.data})
    })
    .catch(error => {
      this.setState({error: true})
    }
    )
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
    const queryParams = []
    for (let i in this.state.ingredients) {
      queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]))
    }
    queryParams.push('price=' + this.state.totalPrice)
    const queryString = queryParams.join('&')

    this.props.history.push({
      pathname: '/checkout',
      search: '?' + queryString
    })

  }

  render() {
    const disabledInfo = {
      ...this.state.ingredients
    }
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0
    }

    let orderSummary = null 

    let burger = this.state.error ? <p>Ingredients can't be loaded</p> : <Spinner/>

    if (this.state.ingredients) {
      burger = (
        <>
        <Burger ingredients={this.state.ingredients} />
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
      orderSummary = <OrderSummary
        ingredients={this.state.ingredients}
        purchaseCancelled={this.purchaseCancelHandler}
        purchaseContinued={this.purchaseContinueHandler}
        totalPrice={this.state.totalPrice}
      />
    }

    if (this.state.loading) {
      orderSummary = <Spinner />
    }

    return (
      <>
      <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
        {orderSummary}
      </Modal>
      {burger}
      </>
    )

  }
}

export default withErrorHandler(BurgerBuilder, axios)
