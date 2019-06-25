import React from 'react';
import Layout from './hoc/Layout/Layout';

import { Route } from 'react-router-dom';

import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';

import './App.css';
import PizzaMaker from './containers/PizzaMaker/PizzaMaker';

function App() {
  return (
        <Layout>
          <Route path="/" exact component={PizzaMaker} />
          <Route path="/orders" component={Orders} />
          <Route path="/checkout" component={Checkout} />
          <Route path="/auth" component={Auth} />
          <Route path="/logout" component={Logout} />
        </Layout>
  );
}

export default App;
