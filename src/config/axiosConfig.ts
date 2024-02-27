import axios from "axios";
import { API_URL } from "./API";



export const $api = axios.create({
    withCredentials: true,
    baseURL: API_URL
});

$api.interceptors.request.use((config) => {
    const token = localStorage.getItem('access_token') || sessionStorage.getItem('access_token');
    if (token) {
        config.headers.Authorization = 'Bearer ' + token;
    }
    return config;
});