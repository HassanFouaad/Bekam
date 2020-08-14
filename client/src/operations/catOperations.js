import { API } from "../config";
import axios from "axios";

/* export const addCat = async (userId, token, name) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  const newCat = { userId, token, category };
  const body = JSON.stringify(newCat);
  const response = await axios
    .post(`${API}/category/create/${userId}`, body, config)
    .then(function (response) {
      return response.data;
    })
    .catch((error) => {
      throw error.response.data;
    });
}; */
export const addCat = async (userId, token, name) => {
  const newCat = { userId, token, name };
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const body = JSON.stringify(newCat);
    const response = await axios.post(
      `${API}/category/create/${userId}`,
      body,
      config
    );
  } catch (err) {
    if (err.response) {
      console.log(err.response);
      throw err.response;
    }
  }
};

export const addProduct = async (userId, token, product) => {
  await axios({
    method: "post",
    url: `${API}/product/create/${userId}`,
    data: product,

    headers: { Accept: "application/json", Authorization: `Bearer ${token}` },
  })
    .then((response) => {
      console.log(response);
      return response;
    })
    .catch((error) => {
      throw error.response.data.error;
    });
};

export const getCats = () => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = axios.get(`${API}/categories`, config);
    return res;
  } catch (error) {
    throw error;
  }
};

/* export const getProducts = (sortBy) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = axios.get(
      `${API}/products?sortBy=${sortBy}&order=desc&limit=4`,
      config
    );
    console.log(res);
    return res.data;
  } catch (error) {
    console.log(error);
    throw error.response.data.error;
  }
}; */
export const getProducts = async (sortBy) => {
  const res = await axios({
    method: "get",
    url: `${API}/products?sortBy=${sortBy}&order=desc&limit=6`,

    headers: { Accept: "application/json" },
  }).catch((error) => {
    throw error.response.data.error;
  });
  console.log(res.data);
  return res.data;
};
export const filteredProduct = async (skip, limit, filters = {}) => {
  let product = { skip, limit, filters };
  const res = await axios({
    method: "post",
    url: `${API}/products/by/search/`,
    data: product,

    headers: { Accept: "application/json" },
  }).catch((error) => {
    throw error.response.data.error;
  });
  console.log(res);

  return res.data;
};
