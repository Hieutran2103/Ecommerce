import axios from "axios";
// import { getUserFromLocalStorage } from "./localStorage";
export const customFetch = axios.create({
  baseURL: "http://localhost:3000/api/v1",
  withCredentials: true,
});

// customFetch.interceptors.request.use((config) => {
//   const user = getUserFromLocalStorage();
//   if (user) {
//     config.headers["Authorization"] = `Bearer ${user.accessToken}`;
//   }
//   return config;
// });
