const updateCartItems = (cartItems, item, idx) => {
  if (item.count === 0) {
    return [...cartItems.slice(0, idx), ...cartItems.slice(idx + 1)];
  }

  if (idx === -1) {
    return [...cartItems, item];
  }

  return [...cartItems.slice(0, idx), item, ...cartItems.slice(idx + 1)];
};

const updateCartItem = (book, item = {}, quantity) => {
  const { id = book.id, count = 0, title = book.title, total = 0 } = item;

  return {
    id,
    title,
    count: count + quantity,
    total: total + quantity * book.price
  };
};

const updateOrder = (state, bookId, quantity) => {
  const {
    bookList: { books },
    shoppingCart: { cartItems }
  } = state;

  const book = books.find(({ id }) => id === bookId);
  const itemIndex = cartItems.findIndex(({ id }) => id === bookId);
  const item = cartItems[itemIndex];

  const newItem = updateCartItem(book, item, quantity);

  const total =
    quantity === -1
      ? state.shoppingCart.orderTotal - book.price
      : state.shoppingCart.orderTotal + book.price;

  return {
    cartItems: updateCartItems(cartItems, newItem, itemIndex),
    orderTotal: total
  };
};

const updateShoppingCart = (state, action) => {
  if (state === undefined) {
    return {
      cartItems: [],
      orderTotal: 0
    };
  }

  switch (action.type) {
    case 'BOOK_ADDED_TO_CART':
      return updateOrder(state, action.payload, 1);

    case 'BOOK_REMOVED_FROM_CART':
      return updateOrder(state, action.payload, -1);

    case 'ALL_BOOKS_REMOVED_FROM_CART':
      const {
        bookList: { books },
        shoppingCart: { cartItems }
      } = state;
      console.log(cartItems);
      const itemIndex = cartItems.findIndex(({ id }) => id === action.payload);
      const item = cartItems.find(({ id }) => id === action.payload);
      const book = books.find(({ id }) => id === action.payload);

      return {
        cartItems: [
          ...cartItems.slice(0, itemIndex),
          ...cartItems.slice(itemIndex + 1)
        ],
        orderTotal: state.shoppingCart.orderTotal - book.price * item.count
      };

    default:
      return state.shoppingCart;
  }
};

export default updateShoppingCart;
