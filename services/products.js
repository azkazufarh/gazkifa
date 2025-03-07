import axios from "axios";
import { URL_API, token } from "./url.js";

export const getQuantity = async (id, callback) => {
    try {
        const res = await axios.get(`${URL_API}/products/count/${id}`, {
            withCredentials: true,
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });

        if (callback) {
            callback(res.message, res.data);
        }
    } catch (error) {
        console.error("Count product failed:", error);
        if (callback) {
            callback(error, null);
        }
    }
}

export const updateStock = async (data, callback) => {
    try {
        const response = await axios.put(`${URL_API}/products/stock/1`, data, {
            withCredentials: true,
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        if (callback) {
            callback(response.status, response.data);
        }
    } catch (error) {
        console.error("Login failed:", error);
        if (callback) {
            callback(error, null);
        }
    }
};