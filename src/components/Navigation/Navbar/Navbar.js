import React from 'react'
import Logo from '../../Logo/Logo'
import styles from './Navbar.module.css'
import NavigationItems from '../NavigationItems/NavigationItems'

const Navbar = (props) => (
  <header className={styles.navbar}>
    <div>MENU</div>
    <Logo height="80%"/>
    <nav className={styles.desktop}>
      <NavigationItems/>
    </nav>
  </header>

)

export default Navbar
