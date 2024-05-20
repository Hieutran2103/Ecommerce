import {
  LOGIN_USER,
  LOGOUT_USER,
  LOAD_AUTH,
  REGISTER_USER,
  NUMBER_USER,
} from "../actions";
import avaUser from "../assets/user.png";
import {
  addUserToLocalStorage,
  listUserToLocalStorage,
  removeListOrderFromLocalStorage,
  removeListUserFromLocalStorage,
  removeUserFromLocalStorage,
} from "../utils/localStorage";

const products_reducer = (state, action) => {
  if (action.type === LOGIN_USER) {
    const user = action.payload;
    addUserToLocalStorage(user);
    return { ...state, user, isLoading: false };
  }
  if (action.type === LOGOUT_USER) {
    removeListUserFromLocalStorage();
    removeListOrderFromLocalStorage();
    removeUserFromLocalStorage();

    return { ...state, user: null };
  }
  if (action.type === LOAD_AUTH) {
    return { ...state, isLoading: true };
  }
  if (action.type === REGISTER_USER) {
    return { ...state, isLoading: false };
  }
  if (action.type === NUMBER_USER) {
    const amountUser = action.payload.count;
    const listuser = action.payload.users;
    const listUser = listuser.map((user) => ({
      id: user._id,
      img: avaUser,
      name: user.name,
      email: user.email,
      verified: user.verified,
    }));
    listUserToLocalStorage(listUser);
    return { ...state, amountUser, listUser };
  }

  return state;
};

export default products_reducer;
