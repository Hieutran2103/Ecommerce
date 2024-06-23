import axios from "axios";
// import { getUserFromLocalStorage } from "./localStorage";
export const customFetch = axios.create({
  baseURL: "https://ecommerce-node-js-two.vercel.app/api/v1",
  withCredentials: true,
});
