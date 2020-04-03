import React from 'react'
import Logo from '../../Logo/Logo'
import styles from './Navbar.module.css'

const Navbar = (props) => (
  <header className={styles.navbar}>
    <div>MENU</div>
    <Logo/>
    <nav>
      ...
    </nav>
  </header>

)

export default Navbar
