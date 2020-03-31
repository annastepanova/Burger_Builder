import React, { Component } from 'react'
import Burger from '../../Burger/Burger'
import BuildControls from '../../Burger/BuildControls/BuildControls'

class BurgerBuilder extends Component {

  state = {
    ingredients: {
      salad: 1,
      bacon: 0,
      cheese: 1,
      meat: 1
    }
  }

  render() {

    return (
      <>
      <Burger ingredients={this.state.ingredients}/>
      <BuildControls/>
      </>
    )

  }
}

export default BurgerBuilder
