import React from 'react'
import Navbar from '../Navigation/Navbar/Navbar'
import styles from './Layout.module.css'

const Layout = (props) => (
  <>
  <Navbar/>
  <main className={styles.content}>{props.children}</main>
  </>
)

export default Layout
