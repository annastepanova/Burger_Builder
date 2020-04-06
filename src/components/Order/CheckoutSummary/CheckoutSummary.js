import React from 'react'
import Burger from '../../Burger/Burger'
import Button from '../../UI/Button/Button'
import styles from './CheckoutSummary.module.css'

const CheckoutSummary = (props) => {

  return (

    <div className={styles.checkoutSummary}>
      <h1>Disfruta de esta deliciosa hamburguesa!</h1>
        <div style={{width: '100%', margin: 'auto'}}>
          <Burger ingredients={props.ingredients} width='100%'/>
        </div>
        <Button btnType="danger" clicked>CANCEL</Button>
        <Button btnType="success" clicked>CONTINUE</Button>
    </div>
  )

}

export default CheckoutSummary
