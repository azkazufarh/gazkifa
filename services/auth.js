import axios from "axios";
import { URL_API } from "./url.js";

// Login function
export const login = async (data, callback) => {
    try {
        const response = await axios.post(`${URL_API}/auth/login`, data, {
            withCredentials: true,
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
