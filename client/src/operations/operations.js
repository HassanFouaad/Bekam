import axios from "axios";
import { API } from "../config";
export const signUp = async (firstname, lastname, password, email) => {
  const newUser = { firstname, lastname, password, email };
  try {
    const config = { headers: { "Content-Type": "application/json" } };
    const body = JSON.stringify(newUser);
    const response = await axios.post(`${API}/signup`, body, config);
    localStorage.setItem("jwt", JSON.stringify(response.data));
  } catch (err) {
    if (err.response) {
      return err.response.data.error;
    }
  }
};

export const signIn = async (email, password) => {
  const logIn = { email, password };
  const config = { headers: { "Content-Type": "application/json" } };
  const body = JSON.stringify(logIn);
  await axios
    .post(`${API}/signin`, body, config)
    .then(function (response) {
      localStorage.setItem("jwt", JSON.stringify(response.data));
      return response.data;
    })
    .catch((error) => {
      localStorage.removeItem("jwt");
      throw error.response.data;
    });
};
export const signOut = async (next) => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("jwt");
    next();
    return await axios.get(`${API}/signout`);
  }
};

export const authenticate = (data, next) => {
  if (typeof window != "undefined") {
    localStorage.setItem("jwt", JSON.stringify(data));
    next();
  }
};

export const isAuthenticated = () => {
  if (typeof window == "undefined") {
    return false;
  }
  if (localStorage.getItem("jwt")) {
    return JSON.parse(localStorage.getItem("jwt"));
  } else {
    return false;
  }
};

export const getPurchaseHistory = (userId, token) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const res = axios.get(`${API}/orders/by/user/${userId}`, config);
    console.log(res)
    return res;
  } catch (error) {
    throw error;
  }
};
