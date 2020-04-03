import React from 'react'
import Logo from '../../Logo/Logo'
import styles from './Navbar.module.css'
import NavigationItems from '../NavigationItems/NavigationItems'
import DrawerToggle from '../SideDrawer/DrawerToggle'

const Navbar = (props) => (
  <header className={styles.navbar}>
    <DrawerToggle clicked={props.drawerToggleClicked}/>
    <Logo height="80%"/>
    <nav className={styles.desktop}>
      <NavigationItems/>
    </nav>
  </header>

)

export default Navbar
