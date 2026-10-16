import "./error-style.css"

export interface ErrorPageProps {
    ErrorCode?: number;
    ErrorMessage?: string;
}

const ErrorPage = (props: ErrorPageProps) => {
    return (
        <div className="error-page-container">
            <div className="error-page-code">
                {props.ErrorCode ? props.ErrorCode : 404}
            </div>
            <div className="error-page-message">
                {props.ErrorMessage ? props.ErrorMessage : "Not Found"}
            </div>
        </div>
    )
}

export default ErrorPage