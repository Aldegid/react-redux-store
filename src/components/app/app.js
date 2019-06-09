import React, { Component } from 'react';

import { withBookstoreService } from '../hoc';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';

import ShoppingCartTable from '../shopping-cart-table';

import ShopHeader from '../shop-header';
import { HomePage, CartPage } from '../pages';

import Loader from '../loader';

import './app.css';

class App extends Component {
  render() {
    const { bookstoreService } = this.props;
    console.log(bookstoreService.getBooks());
    return (
      <main role='main' className='container'>
        <ShopHeader numItems={5} total={200} />
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
