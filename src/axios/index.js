import axios from "axios";
import Cookies from "js-cookie";
import router from '../routers'
import https from 'https'

axios.defaults.httpsAgent = new https.Agent({rejectUnauthorized: false});

axios.interceptors.response.use(
    response => {
        return response;
    },
    e => {
        const {response} = e;
        if (response && response.status === 401
        ) {
            console.log(response);
            document.cookie = "jwt= ; exp = ";
            router.push(
                {
                    path: '/sign-in',
                    name: 'sign-in'
                }
            )
        } else {
            return Promise.reject(e);
        }
    }
);

//TODO: https://stackoverflow.com/questions/51363855/how-to-configure-axios-to-use-ssl-certificate
axios.defaults.headers.common["Authorization"] = Cookies.get("Authorization");
axios.defaults.baseURL = "https://0.0.0.0:8080";

export default axios;

