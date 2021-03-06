import axios from "axios";
import { API } from "../config";

export const createOrder = async (userId, token, orderData) => {
  try {
    const config = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const body = JSON.stringify({ order: orderData });
    const response = await axios.post(
      `${API}/order/create/${userId}`,
      body,
      config
    );
    return response.data;
  } catch (err) {
    console.log(err);
    if (err.response) {
      return err.response;
    }
  }
};

export const orderList = async (userId, token) => {
  try {
    const config = {
      headers: {
        Accept: "application/json",

        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.get(`${API}/order/list/${userId}`, config);
    return response;
  } catch (err) {
    console.log(err);
    if (err.response) {
      return err.response;
    }
  }
};

export const orderStatus = async (userId, token) => {
  try {
    const config = {
      headers: {
        Accept: "application/json",

        Authorization: `Bearer ${token}`,
      },
    };

    const response = await axios.get(
      `${API}/order/status-value/${userId}`,
      config
    );
    console.log(response);
    return response;
  } catch (err) {
    console.log(err);
    if (err.response) {
      return err.response;
    }
  }
};

export const updateOrderStatus = async (
  userId,
  token,
  orderId,
  status,
  order
) => {
  try {
    const config = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const body = JSON.stringify({ status, orderId, order });
    const response = await axios.put(
      `${API}/order/${orderId}/status/${userId}`,
      body,
      config
    );
    console.log(response);
    return response;
  } catch (err) {
    console.log(err);
    if (err.response) {
      return err.response;
    }
  }
};

export const shippedOrder = async (
  userId,
  token,
  orderId,
  status,
  order
) => {
  try {
    const config = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const body = JSON.stringify({ status, orderId, order });
    const response = await axios.put(
      `${API}/order/${orderId}/shipped/${userId}`,
      body,
      config
    );
    console.log(response);
    return response;
  } catch (err) {
    console.log(err);
    if (err.response) {
      return err.response;
    }
  }
};
