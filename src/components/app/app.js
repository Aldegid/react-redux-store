import React, { Component } from 'react';

import { withBookstoreService } from '../hoc';

import Loader from '../loader';

import './app.css';

class App extends Component {
  render() {
    const { bookstoreService } = this.props;
    console.log(bookstoreService.getBooks());
    return <Loader />;
  }
}

export default withBookstoreService()(App);
