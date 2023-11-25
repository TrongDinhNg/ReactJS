import axios from "axios";
// import config from './config';
import { toast } from "react-toastify";

const instance = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL,
    // withCredentials: true
});

instance.interceptors.response.use(
    (response) => {
        //const { data } = response;
        return response.data;
    },
    (err) => {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        const status = err.response?.status || 500;
        // we can handle global errors here
        switch (status) {
            // authentication (token related issues)
            case 401: {
                toast.error("Looix 401");
                console.log("status: ", status);
                return Promise.reject(err);
            }

            // forbidden (permission related issues)
            case 403: {
                toast.error("ban khong co quyen lay!!!");
                return Promise.reject(err);
            }

            // bad request
            case 400: {
                return Promise.reject(err);
            }

            // not found
            case 404: {
                return Promise.reject(err);
            }

            // conflict
            case 409: {
                return Promise.reject(err);
            }

            // unprocessable
            case 422: {
                return Promise.reject(err);
            }

            // generic api error (server related) unexpected
            default: {
                return Promise.reject(err);
            }
        }
    },
);

instance.defaults.withCredentials = true;

export default instance;
