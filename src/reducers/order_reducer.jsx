import { GET_ORDERS, SHOW } from "../actions";
import { listOrderToLocalStorage } from "../utils/localStorage";

const products_reducer = (state, action) => {
  if (action.type === GET_ORDERS) {
    const { count, earning, orders } = action.payload;
    listOrderToLocalStorage(orders);
    return { ...state, totalOrders: count, earnings: earning };
  }
  if (action.type === SHOW) {
    return { ...state, show: action.payload.show };
  }

  return state;
};

export default products_reducer;
