import React, { Component } from 'react';
import BookListItem from '../book-list-item';
import { connect } from 'react-redux';

import { withBookstoreService } from '../hoc';
import { fetchBooks, booksAddedToCart } from '../../actions';

import Loader from '../loader';
import ErrorIndicator from '../error-indicator';

import './book-list.css';

const BookList = ({ books, onAddedToCart }) => {
  return (
    <ul className='book-list'>
      {books.map(book => {
        return (
          <li key={book.id}>
            <BookListItem
              book={book}
              onAddedToCart={() => onAddedToCart(book.id)}
            />
          </li>
        );
      })}
    </ul>
  );
};

class BookListContainer extends Component {
  componentDidMount() {
    this.props.fetchBooks();
  }

  render() {
    const { books, loading, error, onAddedToCart } = this.props;

    if (loading) {
      return <Loader />;
    }

    if (error) {
      return <ErrorIndicator />;
    }
    return <BookList books={books} onAddedToCart={onAddedToCart} />;
  }
}

const mapStateToProps = ({ books, loading, error }) => {
  return { books, loading, error };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const { bookstoreService } = ownProps;
  return {
    fetchBooks: fetchBooks(dispatch, bookstoreService),
    onAddedToCart: id => dispatch(booksAddedToCart(id))
  };
};
export default withBookstoreService()(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(BookListContainer)
);
