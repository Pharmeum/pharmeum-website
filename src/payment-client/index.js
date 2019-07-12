import axios from "axios";
import https from "https";

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const usersClient = axios.create(
    {
        baseURL: process.env.REACT_APP_PAYMENT_API,
        httpsAgent: new https.Agent({
            rejectUnauthorized: false
        })
    }
);

export default usersClient