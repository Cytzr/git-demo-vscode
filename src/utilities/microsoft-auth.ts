import { v4 as uuidv4 } from "uuid";
import Keys from "../../keys-frontend-template-dev";
import { ClearPersistMicrosoftToken } from "./store-handling";

export const redirectToMicrosoftLogin = async () => {
    const tenantId = Keys.tenantId;
    const clientId = Keys.clientId;
    const redirectUri = Keys.redirectUri;
    const state = uuidv4();
    const scope = "User.Read";

    sessionStorage.setItem("auth_state", state);
    sessionStorage.setItem("redirect_path", "/");

    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");
    const returnedState = params.get("state");

    if (code && returnedState) {
        const storedState = sessionStorage.getItem("auth_state");
        localStorage.setItem("auth_state", code);
        if (returnedState === storedState) {
            sessionStorage.removeItem("auth_state");
            sessionStorage.removeItem("redirect_path");
            return;
        }
    }

    const authUrl = new URL(
        `https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/authorize`
    );
    authUrl.searchParams.append("client_id", clientId);
    authUrl.searchParams.append("response_type", "code");
    authUrl.searchParams.append("redirect_uri", redirectUri);
    authUrl.searchParams.append("scope", scope);
    authUrl.searchParams.append("state", state);
    authUrl.searchParams.append("prompt", "select_account");

    window.location.href = authUrl.toString();
};

export const redirectToMicrosoftLogout = () => {
    const tenantId = Keys.tenantId;
    const postLogoutRedirectUri = Keys.logoutRedirectUri;

    sessionStorage.removeItem("auth_state");
    sessionStorage.removeItem("redirect_path");

    ClearPersistMicrosoftToken();

    const logoutUrl = new URL(
        `https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/logout`
    );
    logoutUrl.searchParams.append(
        "post_logout_redirect_uri",
        postLogoutRedirectUri
    );

    window.location.href = logoutUrl.toString();
};
