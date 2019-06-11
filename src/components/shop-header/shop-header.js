import React from 'react';
import { connect } from 'react-redux';
import './shop-header.css';

import { Link } from 'react-router-dom';

const ShopHeader = ({ items, total }) => {
  return (
    <header className='shop-header row align-items-center'>
      <Link to='/'>
        <div className='logo text-dark'>Book Store</div>
      </Link>
      <Link to='/cart'>
        <div className='shopping-cart'>
          <i className='cart-icon fa fa-shopping-cart' />
          {items} items (${total})
        </div>
      </Link>
    </header>
  );
};

const mapStateToProps = ({ shoppingCart: { cartItems, orderTotal } }) => {
  let totalCount = 0;
  cartItems.forEach(item => {
    totalCount = totalCount + item.count;
  });
  return {
    items: totalCount,
    total: orderTotal
  };
};

export default connect(mapStateToProps)(ShopHeader);
