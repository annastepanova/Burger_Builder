import React, { Component } from 'react'
import Navbar from '../Navigation/Navbar/Navbar'
import SideDrawer from '../Navigation/SideDrawer/SideDrawer'
import styles from './Layout.module.css'

class Layout extends Component {

  state = {
    showSideDrawer: true
  }

  sideDrawerClosedHandler = () => {
    this.setState({showSideDrawer: false})

  }

  render () {
    return (
      <>
        <Navbar />
        <SideDrawer open={this.state.showSideDrawer} closed={this.sideDrawerClosedHandler}/>
        <main className={styles.content}>{this.props.children}</main>
      </>
    )
  }
}


export default Layout
