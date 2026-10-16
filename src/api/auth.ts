import Keys from "../../keys-frontend-template-dev";
import APIClient from "../config/api-client";
import { APIClientWithAbort } from "../config/api-client-with-abort";
import { UserCredential } from "../types/auth";

//API Hit to Fetch Microsoft Graph User Information fron Backend
//Standard API Call
export const fetchAuthUser = async (AuthorizationCode: string): Promise<UserCredential> => {
    const response = await APIClient().post<UserCredential>
        ("/auth/token", {
            AuthorizationCode: AuthorizationCode,
            ClientId: Keys.clientId,
            ClientSecret: Keys.clientSecret,
            RedirectUri: Keys.redirectUri,
            TenantId: Keys.tenantId,
        });
    return response.data;
}

//API Call with AbortController for Cancellation Support
export const fetchAuthUserWithCancel = async (AuthorizationCode: string): Promise<UserCredential> => {
    const ApiClient = APIClientWithAbort(window.location.pathname);

    // Used to abort the request
    // AbortAPIClientWithAbort(window.location.pathname);

    const response = await ApiClient.post<UserCredential>
        ("/auth/token", {
            AuthorizationCode: AuthorizationCode,
            ClientId: Keys.clientId,
            ClientSecret: Keys.clientSecret,
            RedirectUri: Keys.redirectUri,
            TenantId: Keys.tenantId,
        });
    return response.data;
}