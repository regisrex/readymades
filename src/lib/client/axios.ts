import axios, { type AxiosInstance } from 'axios';

let api: AxiosInstance;

if (typeof window !== 'undefined' && window.localStorage) {
    const token = window.localStorage.getItem('token');

    api = axios.create({
        baseURL: "/api",
        headers: {
            Authorization: token ? `Bearer ${token}` : '',
        },
    });
} else {
    api = axios.create({
        baseURL: "/api"
    });
}

export default api;