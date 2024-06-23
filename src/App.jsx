import "./App.css";

import {
  HomeLayout,
  SingleProduct,
  Cart,
  Checkout,
  Landing,
  Error,
  About,
  Products,
  PrivateRoute,
  Login,
  Register,
} from "./pages";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ForgotPassword from "./pages/ForgotPassword";
import VerifyPage from "./pages/Verify";
import ResetPassword from "./pages/ResetPassword";
import PrivateAdmin from "./pages/PrivateAdmin";
import Admin from "./pages/Admin";
import Dashboard from "./pages/Dashboard";
import DbOrder from "./pages/DbOrder";
import DbProduct from "./pages/DbProduct";
import DbUser from "./pages/DbUser";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Landing />,
        errorElement: <Error />,
      },
      {
        path: "products",
        element: <Products />,
        errorElement: <Error />,
      },
      {
        path: "products/:id",
        element: <SingleProduct />,
        errorElement: <Error />,
      },
      { path: "cart", element: <Cart /> },
      { path: "about", element: <About /> },
      {
        path: "checkout",
        element: (
          <PrivateRoute>
            <Checkout />
          </PrivateRoute>
        ),
      },
      {
        path: "admin/",
        element: (
          <PrivateAdmin>
            <Admin />
          </PrivateAdmin>
        ),
        children: [
          { path: "", element: <Dashboard /> },
          { path: "orders", element: <DbOrder /> },
          { path: "users", element: <DbUser /> },
          { path: "products", element: <DbProduct /> },
        ],
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
  },
  {
    path: "/user/verify-email",
    element: <VerifyPage />,
  },
  {
    path: "/user/reset-password",
    element: <ResetPassword />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
