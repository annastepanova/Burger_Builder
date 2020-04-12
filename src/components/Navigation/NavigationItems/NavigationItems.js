import React from 'react'
import NavigationItem from './NavigationItem'
import styles from './NavigationItems.module.css'


const NavigationItems = () => (

  <ul className={styles.navigationItems}>
    <NavigationItem link="/" exact>Burger Builder</NavigationItem>
    <NavigationItem link="/orders">Orders</NavigationItem>
    <NavigationItem link="/signin">Sign In</NavigationItem>
  </ul>


)

export default NavigationItems
