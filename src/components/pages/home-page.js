import React from 'react';

import BookLIst from '../book-list';

const HomePage = () => {
  const books = [
    {
      id: 1,
      title: 'Book 1',
      author: 'Aurhor 1'
    },
    {
      id: 2,
      title: 'Book 2',
      author: 'Aurhor 2'
    }
  ];
  return <BookLIst books={books} />;
};

export default HomePage;
