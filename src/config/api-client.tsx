import Keys from "../../keys-frontend-template-dev"
import axios, { AxiosInstance, InternalAxiosRequestConfig } from "axios";

import { TokenBinus } from "../types/auth";
import { GetPersistBinusToken, SetPersistBinusToken } from "../utilities/store-handling";

interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
    skipAuth?: boolean;
}

//Function to Refresh Binus Token From RouteGuard
const refreshBinusToken = async () => {
    try {
        const response = await axios.get(`${Keys.binusTokenUrl}`, {
            headers: {
                Authorization: `Basic ${btoa(Keys.divisionId)}`,
                "Content-Type": "application/json",
                "Accept": "application/json",
            }
        });

        // Store token obtained into Redux Store
        const newToken: TokenBinus = response.data.tokenData;
        SetPersistBinusToken(newToken);

        return newToken;
    }
    catch (error) {
        console.error("Error (failed to refresh token Binus):", error);
        throw error;
    }
}

// const APIClient = axios.create({
//     baseURL: Keys.subDomain,
//     headers: {
//         "Content-Type": "application/json",
//     }
// });

function APIClient(subDomainName?: string): AxiosInstance {

    const tokenData = GetPersistBinusToken();

    const APIClient = axios.create({
        baseURL: subDomainName ? Keys.subDomain.get(subDomainName) : Keys.subDomain.get("default"),
        headers: {
            "Content-Type": "application/json",
        }
    });

    APIClient.interceptors.request.use(async (config: CustomAxiosRequestConfig) => {
        if (config.skipAuth) {
            return config;
        }
        const token = tokenData?.token;

        config.headers = config.headers ?? {};

        if (!token) {
            try {
                const refreshedTokenBinus = await refreshBinusToken();
                config.headers.Authorization = `Bearer ${refreshedTokenBinus}`;
            } catch (error) {
                console.error("Error (failed to refresh token Binus):", error);
            }
        } else {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    });

    //Response Interceptor for Handling Token Refresh Everytime 401 or 403 Error Occurs
    APIClient.interceptors.response.use(
        (response) => response,
        async (error) => {
            console.log(error);
            const originalRequest = error.config;

            if (
                (error.response?.status === 401 || error.response?.status === 403) &&
                !originalRequest._retry
            ) {
                originalRequest._retry = true;

                try {
                    const newToken = await refreshBinusToken();
                    originalRequest.headers.Authorization = `Basic ${newToken.token}`;

                    return APIClient(originalRequest);
                } catch (err) {
                    console.error("Error (token Binus refresh failed):", err);
                    return Promise.reject(err);
                }
            }

            return Promise.reject(error);
        }
    );

    return APIClient;
}

export default APIClient;