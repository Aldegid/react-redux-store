import React, { Component } from 'react';

import { withBookstoreService } from '../hoc';
import { Route, Switch } from 'react-router-dom';

import ShoppingCartTable from '../shopping-cart-table';

import ShopHeader from '../shop-header';
import { HomePage, CartPage } from '../pages';

import './app.css';

class App extends Component {
  render() {
    return (
      <main role='main' className='container'>
        <ShopHeader />
        <Switch>
          <Route path='/' component={HomePage} exact />
          <Route path='/cart' component={CartPage} />
        </Switch>
        <ShoppingCartTable />
      </main>
    );
  }
}

export default withBookstoreService()(App);
