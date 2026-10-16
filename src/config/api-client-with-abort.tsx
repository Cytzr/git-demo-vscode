import axios, { AxiosInstance, InternalAxiosRequestConfig } from "axios";
import Keys from "../../keys-frontend-template-dev";
import APIClient from "./api-client";

import { TokenBinus } from "../types/auth";
import { GetPersistBinusToken, SetPersistBinusToken } from "../utilities/store-handling";

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

interface IAxiosInstance {
    controller: AbortController;
    instance: AxiosInstance;
}

interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
    skipAuth?: boolean;
}

const axiosInstances: { [key: string]: IAxiosInstance } = {};

//API Client Creation with AbortController
const createAPIClient = (subDomainName: string | undefined): IAxiosInstance => {
    const controller = new AbortController();
    const instance = axios.create({
        baseURL: subDomainName ? Keys.subDomain.get(subDomainName) : Keys.subDomain.get("default"),
        headers: {
            "Content-Type": "application/json",
        },
        signal: controller.signal,
    });

    return { controller, instance };
}

const APIClientWithAbort = (axiosID: string, subDomainName?: string | undefined): AxiosInstance => {

    if (axiosInstances[axiosID] && !axiosInstances[axiosID].controller.signal.aborted) {
        return axiosInstances[axiosID].instance;
    }

    axiosInstances[axiosID] = createAPIClient(subDomainName);

    axiosInstances[axiosID].instance.interceptors.request.use(async (config: CustomAxiosRequestConfig) => {
        if (config.skipAuth) {
            return config;
        }
        const token = GetPersistBinusToken()?.token;

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
    axiosInstances[axiosID].instance.interceptors.response.use(
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

    return axiosInstances[axiosID].instance;
}

const AbortAPIClientWithAbort = (axiosId: string) => {
    axiosInstances[axiosId].controller.abort();
}

export { APIClientWithAbort, AbortAPIClientWithAbort };