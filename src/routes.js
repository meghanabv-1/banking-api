import React from 'react';
import { Route, Switch } from "react-router-dom";

import PageNotFound from "./components/PageNotFound";
import HomePage from "./components/home/HomePage";
import RegisterPage from './components/register/RegisterPage';

function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route exact path="/register" component={RegisterPage} />
      <Route component={PageNotFound} />
    </Switch>
  );
}

export default Routes;
