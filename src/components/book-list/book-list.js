import React, { Component } from 'react';
import BookListItem from '../book-list-item';
import { connect } from 'react-redux';

import { withBookstoreService } from '../hoc';
import { fetchBooks } from '../../actions';

import Loader from '../loader';
import ErrorIndicator from '../error-indicator';

import './book-list.css';

const BookList = ({ books }) => {
  return (
    <ul className='book-list'>
      {books.map(book => {
        return (
          <li key={book.id}>
            <BookListItem book={book} />
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
    const { books, loading, error } = this.props;

    if (loading) {
      return <Loader />;
    }

    if (error) {
      return <ErrorIndicator />;
    }
    return <BookList books={books} />;
  }
}

const mapStateToProps = ({ books, loading, error }) => {
  return { books, loading, error };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const { bookstoreService } = ownProps;
  return {
    fetchBooks: fetchBooks(dispatch, bookstoreService)
  };
};
export default withBookstoreService()(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(BookListContainer)
);
