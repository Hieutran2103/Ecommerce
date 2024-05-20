/* eslint-disable no-unused-vars */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
// eslint-disable-next-line react/prop-types
// import axios from "axios";
import { createContext, useContext, useEffect, useReducer } from "react";
import products_reducer from "../reducers/products_reducer";
import { customFetch } from "../utils/axios";

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
  CREATE_PRODUCT_BEGIN,
  CREATE_PRODUCT_SUCCESS,
  CREATE_PRODUCT_ERROR,
} from "../actions";
import { toast } from "react-toastify";
import { getListProductsFromLocalStorage } from "../utils/localStorage";

const initialFiltersState = {
  search: "",
  category: "all",
  company: "all",
  colors: "all",
  sort: "lowest",
  sortOptions: ["lowest", "highest", "a-z", "z-a"],
  freeShipping: false,
  numericFilters: "",
  max_price: 300000,
  price: 300000,
};

const initialState = {
  isSidebarOpen: false,
  isAddProductOpen: false,
  products_loading: false,
  create_loading: false,
  products_error: false,
  products: getListProductsFromLocalStorage(),
  productsFilter: [],
  comments: [],
  countComment: 0,
  featured_products: [],
  single_product_loading: false,
  single_product_error: false,
  single_product: {},
  grid_view: false,
  ...initialFiltersState,
};

const ProductsContext = createContext();

export const ProductsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(products_reducer, initialState);

  const openSidebar = () => {
    dispatch({ type: SIDEBAR_OPEN });
  };

  const closeSidebar = () => {
    dispatch({ type: SIDEBAR_CLOSE });
  };

  //
  const openAddProduct = () => {
    dispatch({ type: ADD_PRODUCT_OPEN });
  };
  const closeAddProduct = () => {
    dispatch({ type: ADD_PRODUCT_CLOSE });
  };

  const deleteProduct = async (id) => {
    try {
      const response = await customFetch.delete(`/products/${id}`);
      toast.success("Delete product successfully");
    } catch (error) {
      toast.error("Delete product failed");
    }
  };

  const createProduct = async (product) => {
    dispatch({ type: CREATE_PRODUCT_BEGIN });

    try {
      const response = await customFetch.post("/products", product);
      dispatch({ type: CREATE_PRODUCT_SUCCESS });
    } catch (error) {
      toast.error("Please completely fill out the form");
    }
  };

  //
  const fetchProducts = async (url) => {
    dispatch({ type: GET_PRODUCTS_BEGIN });
    try {
      const response = await url.get("/products");
      const products = response.data.products;

      dispatch({ type: GET_PRODUCTS_SUCCESS, payload: products });
    } catch (error) {
      dispatch({ type: GET_PRODUCTS_ERROR });
      console.log(error);
    }
  };

  const fetchSingleProduct = async (url, id) => {
    dispatch({ type: GET_SINGLE_PRODUCT_BEGIN });
    try {
      const response = await url.get(`/products/${id}`);
      const singleProduct = response.data.product;

      dispatch({ type: GET_SINGLE_PRODUCT_SUCCESS, payload: singleProduct });
    } catch (error) {
      dispatch({ type: GET_SINGLE_PRODUCT_ERROR });
    }
  };

  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    if (name === "category") {
      value = e.target.textContent;
    }
    if (name === "colors") {
      if (e.target.dataset.color === "all") {
        value = e.target.dataset.color;
      } else {
        value = e.target.dataset.color.slice(1);
      }
    }
    if (name === "price") {
      value = Number(value);
    }
    if (name === "freeShipping") {
      value = e.target.checked;
    }

    dispatch({ type: FILTER_PRODUCTS, payload: { name, value } });
  };

  const FilterProducts = async (url) => {
    const { category, search, company, colors, sort, freeShipping, price } =
      state;

    let param = `products?numericFilters=price<${price}&sort=${sort}&company=${company}&category=${category}&search=${search}`;

    if (freeShipping) {
      param = param + `&freeShipping=${freeShipping}`;
    }
    if (colors) {
      colors === "all"
        ? (param = param + `&colors=`)
        : (param = param + `&colors=${colors}`);
    }
    // console.log(param);
    dispatch({ type: GET_PRODUCTS_BEGIN });
    try {
      const response = await url.get(param);
      const products = response.data.products;
      dispatch({ type: FILTER_PRODUCTS_SUCCESS, payload: products });
    } catch (error) {
      dispatch({ type: GET_PRODUCTS_ERROR });
      console.log(error);
    }
  };

  const clearFilters = async () => {
    dispatch({ type: CLEAR_FILTERS });
  };

  const setGridView = () => {
    dispatch({ type: SET_GRIDVIEW });
  };
  const setListView = () => {
    dispatch({ type: SET_LISTVIEW });
  };
  const updateSort = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    console.log(name, value);
    dispatch({ type: UPDATE_SORT, payload: { name, value } });
  };

  // comment
  const fetchCommentProduct = async (url, id) => {
    dispatch({ type: GET_SINGLE_PRODUCT_BEGIN });
    try {
      const response = await url.get(`/reviews/${id}`);
      const singleCommentProduct = response.data;
      dispatch({ type: GET_COMMENT_PRODUCT, payload: singleCommentProduct });
    } catch (error) {
      dispatch({ type: GET_SINGLE_PRODUCT_ERROR });
    }
  };

  const CommentProduct = async (cmt) => {
    try {
      const resp = await customFetch.post("/reviews", cmt);
      toast.success("Comment successfully", {
        // Sử dụng callback function trong toast để reload lại trang sau khi toast đã biến mất
        onClose: () => {
          window.location.reload();
        },
      });
    } catch (error) {
      toast.error(error.response.data.msg);
    }
  };
  const DeleteCommentProduct = async (id) => {
    try {
      const resp = await customFetch.delete(`/reviews/${id}`);
      toast.success(resp.data.msg);
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    } catch (error) {
      toast.error(error.response.data.msg);
    }
  };

  useEffect(() => {
    fetchProducts(customFetch);
  }, []);

  return (
    <ProductsContext.Provider
      value={{
        ...state,
        openSidebar,
        openAddProduct,
        closeAddProduct,
        closeSidebar,
        deleteProduct,
        fetchSingleProduct,
        handleChange,
        FilterProducts,
        clearFilters,
        setGridView,
        setListView,
        updateSort,
        fetchCommentProduct,
        CommentProduct,
        DeleteCommentProduct,
        fetchProducts,
        createProduct,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

export const useProductsContext = () => {
  return useContext(ProductsContext);
};
