import React from 'react';
import { Route, Switch } from "react-router-dom";

import PageNotFound from "./components/PageNotFound";
import HomePage from "./components/home/HomePage";
import RegisterPage from './components/register/RegisterPage';
import CollectionsPage from './components/collections/CollectionsPage';

function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route exact path="/register" component={RegisterPage} />
      <Route exact path="/collections" component={CollectionsPage} />
      <Route component={PageNotFound} />
    </Switch>
  );
}

export default Routes;
