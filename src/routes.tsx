import { lazy, Suspense } from "react";
import AuthCallbackMiddleware from "./middlewares/auth-callback-middleware";
import { RouteObject } from "react-router-dom";
import CustomBooleanMiddleware from "./middlewares/custom-boolean-middleware";
import ErrorPage from "./pages/error/error-page";

const Home = lazy(() => import("./pages/home/home-page"));
const Error = lazy(() => import("./pages/error/error-page"));
const AuthSuccess = lazy(() => import("./pages/auth-success/auth-success-page"));

//Main Routing Configuration
//Custom Middleware can be imlemented here to handle specific routes
//Other ways to implement might include putting a global variable inside the App.tsx File
//Midldleware implemented inside one route will affect its children as well
//Middlewares that has been implemented includes CustomBooleanMiddleware (Error Page) and AuthCallbackMiddleware (Auth Success Page)
export const AppRoute: RouteObject[] =
    [
        {
            path: "/",
            element: (
                <Suspense fallback={<div>Loading...</div>}>
                    <Home />
                </Suspense>
            ),
        },
        {
            path: "/error",
            element: (
                <Suspense fallback={<div>Loading...</div>}>
                    <CustomBooleanMiddleware validationFn={() => true} fallback={<ErrorPage ErrorCode={401} ErrorMessage='Unathorized' />}>
                        <Error />
                    </CustomBooleanMiddleware>
                </Suspense>
            ),
        },
        {
            path: "/auth/success",
            element: (
                <AuthCallbackMiddleware>
                    <Suspense fallback={<div>Loading...</div>}>
                        <AuthSuccess />
                    </Suspense>
                </AuthCallbackMiddleware>
            )
        }
    ];