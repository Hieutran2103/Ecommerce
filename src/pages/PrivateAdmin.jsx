/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { useOrderContext } from "../context/order_context";
import { useUserContext } from "../context/user_context";

import { Navigate } from "react-router-dom";

const PrivateAdmin = ({ children }) => {
  const { user } = useUserContext();
  const { NumberUser } = useUserContext();
  const { fetchOrders, showData } = useOrderContext();

  useEffect(() => {
    NumberUser();
    fetchOrders();
    showData();
  }, []);

  if (user?.role === "admin") {
    return children;
  } else {
    return <Navigate to="/" />;
  }
};

export default PrivateAdmin;
