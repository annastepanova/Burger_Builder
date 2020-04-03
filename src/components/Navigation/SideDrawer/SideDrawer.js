import React from 'react'
import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'
import styles from './SideDrawer.module.css'

const SideDrawer = (props) => {

  return (

    <div className={styles.sideDrawer}>
      <Logo/>
      <nav>
        <NavigationItems/>
      </nav>
    </div>

  )
}

export default SideDrawer
