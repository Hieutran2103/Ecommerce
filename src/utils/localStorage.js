export const addUserToLocalStorage = (user) => {
  localStorage.setItem("user", JSON.stringify(user));
};

export const removeUserFromLocalStorage = () => {
  localStorage.removeItem("user");
};

export const getUserFromLocalStorage = () => {
  const result = localStorage.getItem("user");
  const user = result ? JSON.parse(result) : null;
  return user;
};

// listUserAdmin
export const listUserToLocalStorage = (listuser) => {
  localStorage.setItem("listuser", JSON.stringify(listuser));
};

export const getListUserFromLocalStorage = () => {
  const result = localStorage.getItem("listuser");
  const listuser = result ? JSON.parse(result) : [];
  return listuser;
};
export const removeListUserFromLocalStorage = () => {
  localStorage.removeItem("listuser");
};

// listOrderAdmin
export const listOrderToLocalStorage = (listOrder) => {
  localStorage.setItem("listOrder", JSON.stringify(listOrder));
};

export const getlistOrderFromLocalStorage = () => {
  const result = localStorage.getItem("listOrder");
  const listOrder = result ? JSON.parse(result) : [];
  return listOrder;
};

export const removeListOrderFromLocalStorage = () => {
  localStorage.removeItem("listOrder");
};

// listProducts
export const listProductsToLocalStorage = (listProducts) => {
  localStorage.setItem("listProducts", JSON.stringify(listProducts));
};

export const getListProductsFromLocalStorage = () => {
  const result = localStorage.getItem("listProducts");
  const listProducts = result ? JSON.parse(result) : [];
  return listProducts;
};

export const removelistProductsFromLocalStorage = () => {
  localStorage.removeItem("listProducts");
};
