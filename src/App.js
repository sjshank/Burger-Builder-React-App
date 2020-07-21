import React, { Suspense, lazy, Component } from 'react';
import classes from './App.css';
import Layout from './components/Layout/Layout';
import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import AuthComponent from './containers/Auth/Auth';
import LogoutComponent from './containers/Logout/Logout';
import { connect } from 'react-redux';
import * as authAction from "./store/actions/index";

const BurgerBuilder = lazy(() => import('./containers/BurgerBuilder/BurgerBuilder'));
const Checkout = lazy(() => import('./containers/Checkout/Checkout'));
const Orders = lazy(() => import('./components/Orders/Orders'));

class App extends Component {
  state = {
    isAuthenticated: false
  };
  componentDidMount() {
    this.props.onAuthCheck();
  }

  render() {
    let routes = <Switch ><Route path="/auth" component={AuthComponent} />
      <Route path="/" exact component={BurgerBuilder} />
      <Redirect to="/" />
    </Switch >;

    if (this.props.isAuth) {
      routes = <Switch ><Route path="/checkout" component={Checkout} />
        <Route path="/orders" component={Orders} />
        <Route path="/logout" component={LogoutComponent} />
        <Route path="/auth" component={AuthComponent} />
        <Route path="/" exact component={BurgerBuilder} />
        <Redirect to="/" />
      </Switch>
    }

    return (
      <div className={classes.App} >
        <Layout>
          <Suspense fallback={<div>Loading...</div>}>
            {routes}
          </Suspense>
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuth: state.auth.tokenData != null
  }
}

const dispatchToPropsMapping = dispatch => {
  return {
    onAuthCheck: () => {
      dispatch(authAction.authCheck());
    },
  }
}

export default withRouter(connect(mapStateToProps, dispatchToPropsMapping)(App));
