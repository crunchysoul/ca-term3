import React from "react";
import {BrowserRouter as Router, Route} from "react-router-dom";

import Navigation from "./Navigation.js";
import LandingPage from "./Landing.js";
import SignUpPage from "./SignUp.js";
import SignInPage from "./SignIn.js";
import PasswordForgetPage from "./PasswordForget.js";
import HomePage from "./Home.js";
import ProductsPage from "./Products.js";
import AccountPage from "./Account.js";
import AdminPage from "./Admin.js";

import * as routes from "../constants/routes.js";
import withAuthentication from "./withAuthentication";

const App = () => (
  <Router>
    <div>
      <Navigation />

      <Route exact path={routes.LANDING} component={() => <LandingPage />} />
      <Route exact path={routes.SIGN_UP} component={() => <SignUpPage />} />
      <Route exact path={routes.SIGN_IN} component={() => <SignInPage />} />
      <Route
        exact
        path={routes.PASSWORD_FORGET}
        component={() => <PasswordForgetPage />}
      />
      <Route exact path={routes.HOME} component={() => <HomePage />} />
      <Route exact path={routes.PRODUCTS} component={() => <ProductsPage />} />
      <Route exact path={routes.ACCOUNT} component={() => <AccountPage />} />
      <Route exact path={routes.ADMIN} component={() => <AdminPage />} />
    </div>
  </Router>
);

export default withAuthentication(App);
