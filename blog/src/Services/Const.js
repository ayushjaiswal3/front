import axios from "axios";
import { getToken } from "../Auth";

export const BASE_URL = "http://localhost:5454";

export const myAxios = axios.create({
    baseURL: BASE_URL,
});

export const privateAxios = axios.create({
    baseURL: BASE_URL,
});
privateAxios.interceptors.request.use(
    (config) => {
        const token = getToken();
        console.log("🔹 Token Being Sent:", token);

        if (!config.headers) {
            config.headers = {};
        }

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
            console.log("Authorization Header Set:", config.headers.Authorization);
        } else {
            console.error("No token found! Authentication might fail.");
        }

        return config;  
    },
    (error) => Promise.reject(error)
);

