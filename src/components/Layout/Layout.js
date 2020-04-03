import React, { Component } from 'react'
import Navbar from '../Navigation/Navbar/Navbar'
import SideDrawer from '../Navigation/SideDrawer/SideDrawer'
import styles from './Layout.module.css'

class Layout extends Component {

  state = {
    showSideDrawer: false
  }

  sideDrawerClosedHandler = () => {
    this.setState({showSideDrawer: false})

  }

  sideDrawerToggleHandler = () => {
    this.setState((prevState) => {
      return {
        showSideDrawer: !prevState.showSideDrawer
      }
    })
  }

  render () {
    return (
      <>
        <Navbar drawerToggleClicked={this.sideDrawerToggleHandler}/>
        <SideDrawer 
        open={this.state.showSideDrawer} 
        closed={this.sideDrawerClosedHandler}
        
        />
        <main className={styles.content}>{this.props.children}</main>
      </>
    )
  }
}


export default Layout
