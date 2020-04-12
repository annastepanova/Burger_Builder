import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import BurgerBuilder from './components/containers/BurgerBuilder/BurgerBuilder'
import Checkout from './components/containers/Checkout/Checkout'
import Orders from './components/containers/Orders/Orders'
import Auth from './components/containers/Auth/Auth'

function App() {
  return (
    <BrowserRouter>
      <div>
          <Layout>
            <Route exact path="/" component={BurgerBuilder}/>
            <Route path="/checkout" component={Checkout} />
            <Route path="/orders" component={Orders} />
            <Route path="/signin" component={Auth} />
          </Layout>
      </div>
    </BrowserRouter>
  );
}

export default App;
