import axios from "axios";
import https from "https";

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const usersClient = axios.create(
    {
        baseURL: "https://0.0.0.0:8080",
        httpsAgent: new https.Agent({
            rejectUnauthorized: false
        })
    }
);

export default usersClient