import React, { Component } from 'react';
import BookListItem from '../book-list-item';
import ErrorIndicator from '../error-indicator';
import { connect } from 'react-redux';
import { withBookstoreService } from '../hoc';
import { booksLoaded, booksRequested, booksError } from '../../actions';
import Loader from '../loader';

import './book-list.css';

class BookList extends Component {
  componentDidMount() {
    const {
      bookstoreService,
      booksLoaded,
      booksRequested,
      booksError
    } = this.props;
    booksRequested();
    bookstoreService
      .getBooks()
      .then(books => booksLoaded(books))
      .catch(err => booksError(err));
  }

  render() {
    const { books, loading, error } = this.props;
    console.log(error);
    if (loading) {
      return <Loader />;
    }

    if (error) {
      return <ErrorIndicator />;
    }

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
  }
}

const mapStateToProps = ({ books, loading, error }) => {
  return { books, loading, error };
};

const mapDispatchToProps = {
  booksLoaded,
  booksRequested,
  booksError
};

export default withBookstoreService()(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(BookList)
);
