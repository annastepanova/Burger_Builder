import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import CheckoutSummary from '../../Order/CheckoutSummary/CheckoutSummary'
import ContactData from './ContactData/ContactData'

class Checkout extends Component {

  initState = () => {
    const queryInit = new URLSearchParams(
      this.props.location.search
    );
    const ingredientsInit = {};
    let priceInit = 0;
    for (let param of queryInit.entries()) {
      if (param[0] === 'price') {
        priceInit = param[1];
      } else {
        ingredientsInit[param[0]] = +param[1];
      }
    }
    return {
      ingredients: ingredientsInit,
      totalPrice: priceInit
    }
  }
  
  state = this.initState() 

  checkoutCancelled = () => {
    this.props.history.goBack()
  }

  checkoutContinued = () => {
    this.props.history.replace('/checkout/contact-data')
  }

  render () {

    return (
      <div>
        <CheckoutSummary 
        checkoutCancelled={this.checkoutCancelled}
        checkoutContinued={this.checkoutContinued}
        ingredients={this.state.ingredients}/>
        <Route path={this.props.match.path + '/contact-data'}
        render={(props) => (<ContactData ingredients={this.state.ingredients} price={this.state.totalPrice} {...props}/>)}/>
      </div>
    )
  }
}

export default Checkout
