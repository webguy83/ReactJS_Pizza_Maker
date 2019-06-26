import React, { Component } from 'react';
import Layout from './hoc/Layout/Layout';

import { Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from './store/actions/index';

import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';

import Auxiliary from './hoc/Auxiliary/Auxiliary';

import './App.css';
import PizzaMaker from './containers/PizzaMaker/PizzaMaker';

class App extends Component {

  componentDidMount() {
    this.props.autoSignUp();
  }

  render() {
    return (
      <Layout>
        <Route path="/" exact component={PizzaMaker} />
        <Route path="/auth" component={Auth} />
        {this.props.isAuthenticated ? <Auxiliary>
          <Route path="/orders" component={Orders} />
          <Route path="/checkout" component={Checkout} />
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
