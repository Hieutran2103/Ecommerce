import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ProductsProvider } from "./context/products_context.jsx";
import { CartProvider } from "./context/cart_context.jsx";
import { UserProvider } from "./context/user_context.jsx";
import { OrderProvider } from "./context/order_context.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UserProvider>
      <OrderProvider>
        <ProductsProvider>
          <CartProvider>
            <ToastContainer position="top-center" />
            <App />
          </CartProvider>
        </ProductsProvider>
      </OrderProvider>
    </UserProvider>
  </React.StrictMode>
);
