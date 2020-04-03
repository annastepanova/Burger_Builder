import React from 'react'
import Navbar from '../Navigation/Navbar/Navbar'
import SideDrawer from '../Navigation/SideDrawer/SideDrawer'
import styles from './Layout.module.css'

const Layout = (props) => (
  <>
  <Navbar/>
  <SideDrawer/>
  <main className={styles.content}>{props.children}</main>
  </>
)

export default Layout
