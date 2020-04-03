import React from 'react'
import burgerLogo from  '../../assets/image/burger.png'
import styles from './Logo.module.css'

const Logo = (props) => (

  <div className={styles.logo}>
    <img src={burgerLogo} alt="burger"/>
  </div>


)

export default Logo
