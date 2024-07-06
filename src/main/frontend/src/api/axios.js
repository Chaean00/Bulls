import axios from "axios";
import CryptoJs from "crypto-js";
import {reissue} from "./TokenApi";

const instance = axios.create({
    baseURL: '/',
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 5000
});

// Axios 요청 인터셉터
instance.interceptors.request.use(
    (config) => {
        const decryptToken = CryptoJs.AES.decrypt(
            localStorage.getItem('access_token'),
            process.env.REACT_APP_SECRET_KEY
        ).toString(CryptoJs.enc.Utf8);
        config.headers.Authorization = `Bearer ${decryptToken}`;
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Axios 응답 인터셉터
instance.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            const token = await reissue();
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return instance(originalRequest);
        }
        if (error.response?.status === 400) {
            console.log(error)
            console.log(400)
        }
        if (error.response?.status === 403) {
            console.log(error)
            console.log(403)
        }
        if (error.response?.status === 409) {
            console.log(error)
            console.log(409)
        }
        if (error.response?.status === 500) {
            console.log(error)
            console.log(500)
        }
        return Promise.reject(error);
    }
);

export default instance;