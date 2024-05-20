import { toast } from "react-toastify";
import {
  SIDEBAR_OPEN,
  SIDEBAR_CLOSE,
  GET_PRODUCTS_BEGIN,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_ERROR,
  GET_SINGLE_PRODUCT_BEGIN,
  GET_SINGLE_PRODUCT_SUCCESS,
  GET_SINGLE_PRODUCT_ERROR,
  FILTER_PRODUCTS,
  FILTER_PRODUCTS_SUCCESS,
  CLEAR_FILTERS,
  SET_GRIDVIEW,
  SET_LISTVIEW,
  UPDATE_SORT,
  GET_COMMENT_PRODUCT,
  ADD_PRODUCT_OPEN,
  ADD_PRODUCT_CLOSE,
  CREATE_PRODUCT_SUCCESS,
  CREATE_PRODUCT_BEGIN,
} from "../actions";
import { listProductsToLocalStorage } from "../utils/localStorage";

const products_reducer = (state, action) => {
  if (action.type === SIDEBAR_OPEN) {
    return { ...state, isSidebarOpen: true };
  }
  if (action.type === SIDEBAR_CLOSE) {
    return { ...state, isSidebarOpen: false };
  }

  //
  if (action.type === ADD_PRODUCT_OPEN) {
    return { ...state, isAddProductOpen: true };
  }
  if (action.type === ADD_PRODUCT_CLOSE) {
    return { ...state, isAddProductOpen: false };
  }

  if (action.type === CREATE_PRODUCT_BEGIN) {
    return { ...state, create_loading: true };
  }

  if (action.type === CREATE_PRODUCT_SUCCESS) {
    toast.success("Add product successfully");
    return { ...state, create_loading: false };
  }

  //Loading products

  if (action.type === GET_PRODUCTS_BEGIN) {
    return { ...state, products_loading: true };
  }
  if (action.type === GET_PRODUCTS_SUCCESS) {
    const featured_products = action.payload.filter(
      (product) => product.featured === true
    );
    listProductsToLocalStorage(action.payload);
    return {
      ...state,
      featured_products,
      products_loading: false,
    };
  }
  if (action.type === GET_PRODUCTS_ERROR) {
    return { ...state, products_error: true };
  }

  // Get single product
  if (action.type === GET_SINGLE_PRODUCT_BEGIN) {
    return { ...state, single_product_loading: true };
  }
  if (action.type === GET_SINGLE_PRODUCT_SUCCESS) {
    return {
      ...state,
      single_product_loading: false,
      single_product: action.payload,
    };
  }
  if (action.type === GET_SINGLE_PRODUCT_ERROR) {
    return {
      ...state,
      single_product_loading: false,
      single_product_error: true,
    };
  }

  //Filter products
  if (action.type === FILTER_PRODUCTS) {
    const { name, value } = action.payload;
    return { ...state, [name]: value };
  }
  if (action.type === FILTER_PRODUCTS_SUCCESS) {
    return {
      ...state,
      products_loading: false,
      productsFilter: action.payload,
    };
  }
  if (action.type === CLEAR_FILTERS) {
    return {
      ...state,
      search: "",
      category: "all",
      company: "all",
      colors: "all",
      freeShipping: false,
      numericFilters: "",
      max_price: 300000,
      price: 300000,
    };
  }
  if (action.type === SET_GRIDVIEW) {
    return {
      ...state,
      grid_view: true,
    };
  }
  if (action.type === SET_LISTVIEW) {
    return {
      ...state,
      grid_view: false,
    };
  }
  if (action.type === UPDATE_SORT) {
    const { name, value } = action.payload;

    return { ...state, [name]: `${value}` };
  }

  // comment
  if (action.type === GET_COMMENT_PRODUCT) {
    return {
      ...state,
      products_loading: false,
      comments: action.payload.reviews,
      countComment: action.payload.count,
    };
  }

  return state;
};

export default products_reducer;
