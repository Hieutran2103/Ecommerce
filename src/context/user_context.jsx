/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import { useContext, useReducer, createContext } from "react";
import reducer from "../reducers/user_reducer";
import {
  LOGIN_USER,
  LOGOUT_USER,
  LOAD_AUTH,
  REGISTER_USER,
  NUMBER_USER,
} from "../actions";
import { customFetch } from "../utils/axios";
import { toast } from "react-toastify";

import {
  getListUserFromLocalStorage,
  getUserFromLocalStorage,
} from "../utils/localStorage";

const UserContext = createContext();

const initialState = {
  user: getUserFromLocalStorage(),
  isLoading: false,
  amountUser: 0,
  listUser: getListUserFromLocalStorage(),
};

export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const loginUser = async (user) => {
    dispatch({
      type: LOAD_AUTH,
    });
    try {
      const resp = await customFetch.post("/auth/login", user);
      toast.success("Login successfully");
      dispatch({
        type: LOGIN_USER,
        payload: resp.data.user,
      });
    } catch (error) {
      toast.error(error.response.data.msg);
    }
  };

  const registerUser = async (user) => {
    dispatch({
      type: LOAD_AUTH,
    });
    try {
      const resp = await customFetch.post("/auth/register", user);
      toast.success(
        "Sucessfully Created! Check Your Email To Verify Your Account"
      );
      dispatch({
        type: REGISTER_USER,
      });
    } catch (error) {
      toast.error(error.response.data.msg);
    }
  };

  const NumberUser = async () => {
    try {
      const resp = await customFetch.get("/users");
      dispatch({
        type: NUMBER_USER,
        payload: resp.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
  const logoutUser = () => {
    toast.success("Logout successfully");
    dispatch({
      type: LOGOUT_USER,
    });
  };

  return (
    <UserContext.Provider
      value={{
        ...state,
        loginUser,
        registerUser,
        logoutUser,
        NumberUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
// make sure use
export const useUserContext = () => {
  return useContext(UserContext);
};
