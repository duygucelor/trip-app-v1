import { Auth } from 'aws-amplify';
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';


export class AxiosClientError {
    type?:string;

    message?:string;

    constructor(error: any) {
        this.type = error.type ?? 'unknown';
        this.message = error.message ?? 'unknown';
    }
}

const createAxiosClient =  (backendUrl: string) => {
    const axiosClientConfig: AxiosRequestConfig = {
        baseURL: backendUrl,
        timeout: 5000,
        headers: {
            "Accept": 'application/json',
            "Content-Type": 'application/json;charset=UTF-8',
        },
    };
    const axiosClient: AxiosInstance = axios.create(axiosClientConfig);

    axiosClient.interceptors.request.use(async (req)=> {
        const user = await Auth.currentAuthenticatedUser();
        const token: string = user.signInUserSession.idToken.jwtToken;
        if (req.headers && req.headers.common) {
            req.headers.authorization = token ?? "";
        }
        return req;
    });

    axiosClient.interceptors.response.use((response) => response, async (error) => {
        const response = error.response.data;

        return Promise.reject(new AxiosClientError(response));
    });

    return axiosClient;
};

export default createAxiosClient;
