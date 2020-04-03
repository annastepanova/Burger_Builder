import React from 'react'
import NavigationItem from './NavigationItem'
import styles from './NavigationItems.module.css'


const NavigationItems = () => (

  <ul className={styles.navigationItems}>
    <NavigationItem link="/" active={true}>Burger Builder</NavigationItem>
    <NavigationItem link="/">Checkout</NavigationItem>
  </ul>


)

export default NavigationItems
