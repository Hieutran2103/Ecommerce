/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import { useContext, useReducer, createContext } from "react";
import reducer from "../reducers/order_reducer";
import { GET_ORDERS, SHOW } from "../actions";
import { customFetch } from "../utils/axios";
import { toast } from "react-toastify";
import { getlistOrderFromLocalStorage } from "../utils/localStorage";

const OrderContext = createContext();

const initialState = {
  totalOrders: 0,
  earnings: 0,
  orders: getlistOrderFromLocalStorage(),
  show: [],
};

export const OrderProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchOrders = async () => {
    try {
      const resp = await customFetch.get("/orders");
      dispatch({
        type: GET_ORDERS,
        payload: resp.data,
      });
    } catch (error) {
      toast.error(error.response.data.msg);
    }
  };
  const showData = async () => {
    try {
      const resp = await customFetch.get("/orders/show");
      dispatch({
        type: SHOW,
        payload: resp.data,
      });
    } catch (error) {
      toast.error(error.response.data.msg);
    }
  };

  return (
    <OrderContext.Provider
      value={{
        ...state,
        fetchOrders,
        showData,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};
// make sure use
export const useOrderContext = () => {
  return useContext(OrderContext);
};
