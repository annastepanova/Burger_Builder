import React from 'react'
import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'
import Backdrop from '../../UI/Backdrop/Backdrop'
import styles from './SideDrawer.module.css'

const SideDrawer = (props) => {
let attachedStyles = [styles.sideDrawer, styles.close]

if (props.open) {
  attachedStyles = [styles.sideDrawer, styles.open]
}
  return (
    <>
      <Backdrop show={props.open} clicked={props.closed}/>
      <div className={attachedStyles.join(' ')}>
        <div className={styles.logo}><Logo/></div>
        <nav>
          <NavigationItems/>
        </nav>
      </div>
    </>

  )
}

export default SideDrawer
