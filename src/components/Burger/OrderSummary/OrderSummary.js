import React from 'react'
import Button from '../../UI/Button/Button'

const OrderSummary = (props) => {
  const ingredientSummary = Object.keys(props.ingredients)
  .map(ingKey => {
    return <li key={ingKey}><span style={{textTransform: "capitalize"}}>{ingKey}</span>: {props.ingredients[ingKey]}</li>
  })
  return (
    <>
    <h3>Your Order</h3>
    <p>A burger delicioso with the following ingredients:</p>
    <ul>
      {ingredientSummary}
    </ul>
      <p><strong>Total price: {props.totalPrice.toFixed(2)}</strong></p>
    <p>Continue to checkout?</p>
    <Button btnType="danger" clicked={props.purchaseCancelled}>CANCEL</Button>
    <Button btnType="success" clicked={props.purchaseContinued}>CONTINUE</Button>
    </>
  )
}

export default OrderSummary
