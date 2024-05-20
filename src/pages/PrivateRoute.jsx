/* eslint-disable react/prop-types */
import { useUserContext } from "../context/user_context";

import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const { user } = useUserContext();
  if (!user) {
    return <Navigate to="/" />;
  }
  return children;
};

export default PrivateRoute;
