import React, { Component } from 'react';
import Layout from './hoc/Layout/Layout';

import { Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from './store/actions/index';

import LazyLoader from './hoc/LazyLoader/LazyLoader';

import Logout from './containers/Auth/Logout/Logout';

import Auxiliary from './hoc/Auxiliary/Auxiliary';

import './App.css';
import PizzaMaker from './containers/PizzaMaker/PizzaMaker';

const LazyLoaderOrders = LazyLoader(() => {
  return import('./containers/Orders/Orders');
});

const LazyLoaderAuth = LazyLoader(() => {
  return import('./containers/Auth/Auth');
})

const LazyLoaderCheckout = LazyLoader(() => {
  return import('./containers/Checkout/Checkout');
})

class App extends Component {

  componentDidMount() {
    this.props.autoSignUp();
  }

  render() {
    return (
      <Layout>
        <Route path="/" exact component={PizzaMaker} />
        <Route path="/auth" component={LazyLoaderAuth} />
        {this.props.isAuthenticated ? <Auxiliary>
          <Route path="/orders" component={LazyLoaderOrders} />
          <Route path="/checkout" component={LazyLoaderCheckout} />
          <Route path="/logout" component={Logout} />
        </Auxiliary> : null}
      </Layout>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    autoSignUp: () => {
      return dispatch(actions.authCheckStatus())
    }
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
