import React from 'react'
import styles from './Order.module.css'

const Order = (props) => (

  <div className={styles.order}>
    <p>Ingredients: Salad (1)</p>
    <p>Price: <strong>USD 10.00</strong></p>

  </div>
)

export default Order