import axios from "axios";
import { URL_API, token } from "./url.js";

export const getMonthlyHistory = async (id, type, callback) => {
  console.log(type);
  try {
    const res = await axios.get(`${URL_API}/transactions/last30days/${id}`, {
      withCredentials: true,
      params: {
        type,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (callback) {
      callback(res);
    }
  } catch (error) {
    console.error("Count product failed:", error);
    if (callback) {
      callback(error, null);
    }
  }
};

export const getAllTransaction = async (
  page,
  limit,
  search,
  type,
  createdAt,
  callback
) => {
  try {
    const response = await axios.get(`${URL_API}/transactions`, {
      withCredentials: true,
      params: {
        page,
        limit,
        search,
        type,
        createdAt,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (callback) {
      callback(response.data);
    }
  } catch (error) {
    console.error("Failed to fetch customers:", error);
    if (callback) {
      callback(error, null);
    }
  }
};

export const addTransaction = async (data, callback) => {
  try {
    const response = await axios.post(`${URL_API}/transactions/new`, data, {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (callback) {
      callback(response.status, response.data);
    }
  } catch (error) {
    console.error("Transaction failed:", error);
    if (callback) {
      callback(error, null);
    }
  }
};

export const getMonthlyIncome = async (callback) => {
  try {
    const res = await axios.get(`${URL_API}/transactions/totalExpenses`, {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (callback) {
      callback(res.data);
    }
  } catch (error) {
    console.error("Count product failed:", error);
    if (callback) {
      callback(error, null);
    }
  }
};

export const getDate = async (callback) => {
  try {
    const res = await axios.get(`${URL_API}/transactions/distinctDate`, {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (callback) {
      callback(res.data);
    }
  } catch (error) {
    console.error("Fetch date failed:", error);
    if (callback) {
      callback(error, null);
    }
  }
};
