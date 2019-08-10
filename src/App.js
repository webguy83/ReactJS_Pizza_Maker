import React, { useEffect, Suspense } from 'react';
import Layout from './hoc/Layout/Layout';

import { Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from './store/actions/index';

import Logout from './containers/Auth/Logout/Logout';
import Spinner from './components/UI/Spinner/Spinner';

import './App.css';
import PizzaMaker from './containers/PizzaMaker/PizzaMaker';

const Orders = React.lazy(() => {
  return import('./containers/Orders/Orders');
});

const Auth = React.lazy(() => {
  return import('./containers/Auth/Auth');
})

const Checkout = React.lazy(() => {
  return import('./containers/Checkout/Checkout');
})

const App = (props) => {

  const { autoSignUp, isAuthenticated } = props;

  useEffect(() => {
    autoSignUp();
  }, [autoSignUp])

  return (
    <Layout>
      <Suspense fallback={<Spinner />}>
        <Route path="/" exact component={PizzaMaker} />
        <Route path="/auth" render={(props) => <Auth {...props} />} />
        {isAuthenticated ? <>
          <Route path="/orders" render={(props) => <Orders {...props} />} />
          <Route path="/checkout" render={(props) => <Checkout {...props} />} />
          <Route path="/logout" component={Logout} />
        </> : null}
      </Suspense>
    </Layout>
  );
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
