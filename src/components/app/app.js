import React, { Component } from 'react';

import { withBookstoreService } from '../hoc';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';

import { HomePage, CartPage } from '../pages';

import Loader from '../loader';

import './app.css';

class App extends Component {
  render() {
    const { bookstoreService } = this.props;
    console.log(bookstoreService.getBooks());
    return (
      <Switch>
        <Route path='/' component={HomePage} exact />
        <Route path='/cart' component={CartPage} />
      </Switch>
    );
  }
}

export default withBookstoreService()(App);
