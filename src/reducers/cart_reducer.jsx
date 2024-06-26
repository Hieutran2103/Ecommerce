import {
  ADD_TO_CART,
  CLEAR_CART,
  COUNT_CART_TOTALS,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
} from "../actions";

const cart_reducer = (state, action) => {
  if (action.type === ADD_TO_CART) {
    const { id, color, amount, product } = action.payload;
    const tempItem = state.items.find(
      (i) => i.product + i.color === id + color
    );

    if (tempItem) {
      const tempCart = state.items.map((cartItem) => {
        if (cartItem.product + cartItem.color === id + color) {
          let newAmount = cartItem.amount + amount;
          return { ...cartItem, amount: newAmount };
        } else {
          return cartItem;
        }
      });
      return { ...state, items: tempCart };
    } else {
      const newItems = {
        product: id,
        name: product.name,
        color,
        amount,
        image: product.image[0],
        price: product.price,
      };
      return { ...state, items: [...state.items, newItems] };
    }
  }
  if (action.type === REMOVE_CART_ITEM) {
    const tempCart = state.items.filter(
      (item) => item.product !== action.payload.id
    );
    return { ...state, items: tempCart };
  }
  if (action.type === CLEAR_CART) {
    return { ...state, items: [] };
  }

  if (action.type === TOGGLE_CART_ITEM_AMOUNT) {
    const { id, value } = action.payload;
    const tempCart = state.items.map((item) => {
      if (item.product === id) {
        if (value === "inc") {
          let newAmount = item.amount + 1;

          return { ...item, amount: newAmount };
        }
        if (value === "dec") {
          let newAmount = item.amount - 1;
          if (newAmount < 1) {
            newAmount = 1;
          }
          return { ...item, amount: newAmount };
        }
      }
      return item;
    });
    return { ...state, items: tempCart };
  }
  if (action.type === COUNT_CART_TOTALS) {
    const { total_items, total_amount } = state.items.reduce(
      (total, cartItem) => {
        const { amount, price } = cartItem;
        total.total_items += amount;
        total.total_amount += price * amount;
        return total;
      },
      { total_items: 0, total_amount: 0 }
    );
    return { ...state, total_items, total_amount };
  }

  return state;
  // throw new Error(`No Matching "${action.type}" - action type`);
};

export default cart_reducer;
