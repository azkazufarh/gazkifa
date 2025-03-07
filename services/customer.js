import axios from "axios";
import { URL_API, token } from "./url.js";

export const getCostumers = async (
  type,
  page = 1,
  limit = 10,
  search = "",
  callback
) => {
  try {
    const response = await axios.get(`${URL_API}/costumers`, {
      withCredentials: true,
      params: {
        type,
        ...(page && { page }),
        ...(limit && { limit }),
        ...(search && { search }),
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (callback) {
      callback(response.status, response.data);
    }
  } catch (error) {
    console.error("Failed to fetch customers:", error);
    if (callback) {
      callback(error, null);
    }
  }
};

export const newCustomer = async (data, callback) => {
  try {
    const response = await axios.post(`${URL_API}/costumers`, data, {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
    if (callback) {
      callback(response);
    }
  } catch (error) {
    if (callback) {
      callback(error, null);
    } else {
      console.error("Error posting new customer:", error);
    }
  }
};

export const updateCustomer = async (data, callback) => {
  try {
    const response = await axios.put(`${URL_API}/costumers`, data, {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
    if (callback) {
      callback(response);
    }
  } catch (error) {
    if (callback) {
      callback(error, null);
    } else {
      console.error("Error posting new customer:", error);
    }
  }
};
