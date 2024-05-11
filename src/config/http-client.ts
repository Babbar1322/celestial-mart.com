import store from '@/redux';
import { setIsLoggedIn } from '@/redux/slices/authSlice';
import { CommonAxiosResponse } from '@/typings/data';
import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { toast } from 'react-toastify';

const Axios = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    timeout: 50000,
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
});
// Change request data/error
Axios.interceptors.request.use((config) => {
    const token = store.getState().auth.token;
    if (token) {
        // config.headers.Authorization = `Bearer ${token}`;
        if (config.data instanceof FormData) {
            config.data.append('token', token);
        } else if (/post/gi.test(config.method ?? '')) {
            config.data = { ...config.data, token };
        }
    }
    return config;
});

// Change response data/error here
Axios.interceptors.response.use(
    (response) => response,
    (error: AxiosError<CommonAxiosResponse>) => {
        const responseError = error.response?.data.error ?? error.response?.data.errors;
        const responseMessage = error.response?.data.message;
        if (responseError !== null && typeof responseError === 'object') {
            Object.values(responseError).map((value) => {
                toast.error(value[0]);
            });
        } else if (typeof responseError === 'string') {
            if (
                responseError === 'Unauthenticated' ||
                responseError === 'Token is Expired' ||
                responseError === 'Token is Invalid'
            ) {
                store.dispatch(setIsLoggedIn({ isLoggedIn: false, token: '' }));
                toast.error('Please Login Again');
            } else {
                toast.error(responseError);
            }
        }
        if (!responseError) {
            if (typeof responseMessage === 'string') {
                if (responseMessage.includes('Unauthenticated')) {
                    store.dispatch(setIsLoggedIn({ isLoggedIn: false, token: '' }));
                } else {
                    toast.error(responseMessage);
                }
            }
        }
        return Promise.reject(error);
    }
);

export class HttpClient {
    static async get<T>(url: string, params?: unknown) {
        const response = await Axios.get<T>(url, { params });
        return response.data;
    }

    static async post<T>(url: string, data?: unknown, options?: AxiosRequestConfig) {
        const response = await Axios.post<T>(url, data, options);
        return response.data;
    }

    static async put<T>(url: string, data: unknown) {
        const response = await Axios.put<T>(url, data);
        return response.data;
    }

    static async delete<T>(url: string) {
        const response = await Axios.delete<T>(url);
        return response.data;
    }
}
