import { SetPersistMicrosoftToken } from "../utilities/store-handling";

// Middleware to handle the authentication callback from Microsoft
const AuthCallbackMiddleware = ({ children }: { children: React.ReactNode }) => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");
    const state = params.get("state");
    const sessionState = params.get("session_state");

    if (!code || !state || !sessionState) {
        throw new Error("Invalid Authentication");
    }

    SetPersistMicrosoftToken({ code: code, state: state, sessionState: sessionState });

    return <>{children}</>;
}

export default AuthCallbackMiddleware;