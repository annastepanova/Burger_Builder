import React from 'react'
import Layout from './components/Layout/Layout'
import BurgerBuilder from './components/containers/BurgerBuilder/BurgerBuilder'
import Checkout from './components/containers/Checkout/Checkout'

function App() {
  return (
    <div>
      <Layout>
        <BurgerBuilder/>
        <Checkout/>
      </Layout>
    </div>
  );
}

export default App;
