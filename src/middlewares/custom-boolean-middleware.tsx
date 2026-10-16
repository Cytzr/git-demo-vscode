import React from "react";

interface CustomMiddlewareProps {
    validationFn: () => boolean,
    children?: React.ReactNode,
    fallback: React.ReactNode,
}

//Custom middleware component that conditionally renders children based on a validation function (Boolean)
const CustomBooleanMiddleware = ({ validationFn, children, fallback }: CustomMiddlewareProps) => {

    if (validationFn()) {
        return <>{children}</>
    }
    else {
        return <>{fallback}</>
    }

}

export default CustomBooleanMiddleware;