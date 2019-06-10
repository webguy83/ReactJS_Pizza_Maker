import React from 'react';
import Layout from './hoc/Layout/Layout';

import { Route, BrowserRouter } from 'react-router-dom';

import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';

import './App.css';
import PizzaMaker from './containers/PizzaMaker/PizzaMaker';

function App() {
  return (
      <BrowserRouter>
        <Layout>
          <Route path="/" exact component={PizzaMaker} />
          <Route path="/orders" component={Orders} />
          <Route path="/checkout" component={Checkout} />
        </Layout>
      </BrowserRouter>
  );
}

export default App;
