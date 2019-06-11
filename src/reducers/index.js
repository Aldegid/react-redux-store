const initialState = {
  books: [],
  loading: true,
  error: null,
  cartItems: [],
  orderTotal: 220
};

const updateItemsInCart = (cartItems, newItem, index) => {
  if (index === -1) {
    return [...cartItems, newItem];
  }
  return [...cartItems.slice(0, index), newItem, ...cartItems.slice(index + 1)];
};

const updateItem = (book, item) => {
  if (item) {
    return {
      ...item,
      count: item.count + 1,
      total: item.total + book.price
    };
  } else {
    return {
      id: book.id,
      name: book.title,
      count: 1,
      total: book.price
    };
  }
};

const reducer = (state = initialState, action) => {
  console.log(action.type);
  switch (action.type) {
    case 'FETCH_BOOKS_REQUEST':
      return {
        ...state,
        books: action.payload,
        loading: false,
        error: null
      };
    case 'FETCH_BOOKS_SUCCESS':
      return {
        ...state,
        books: [],
        loading: true,
        error: null
      };
    case 'FETCH_BOOKS_FAILURE':
      return {
        ...state,
        books: [],
        loading: false,
        error: action.payload
      };
    case 'BOOK_ADDED_TO_CART':
      const bookId = action.payload;
      const book = state.books.find(book => book.id === bookId);
      const itemIndex = state.cartItems.findIndex(({ id }) => id === bookId);
      const currentItem = state.cartItems[itemIndex];

      const newItemInCart = updateItem(book, currentItem);

      return {
        ...state,
        cartItems: updateItemsInCart(state.cartItems, newItemInCart, itemIndex)
      };

    default:
      return state;
  }
};

export default reducer;
