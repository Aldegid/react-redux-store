const initialState = {
  books: [
    {
      id: 1,
      title: 'Book 1',
      author: 'Aurhor 1'
    },
    {
      id: 2,
      title: 'Book 2',
      author: 'Aurhor 2'
    },
    {
      id: 3,
      title: 'Book 3',
      author: 'Aurhor 3'
    }
  ]
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'BOOKS_LOADED':
      return {
        books: action.payload
      };
    default:
      return state;
  }
};

export default reducer;
