import { Component, ErrorInfo, ReactNode } from 'react';
// Turn this on to enable error page params passing
// import { ErrorPageProps } from '../pages/error/error-page';

interface ErrorBoundaryProps {
    children: ReactNode;
    // Turn this on to enable error page params passing
    // fallback: (props: ErrorPageProps) => ReactNode;
    fallback: ReactNode;
}

interface ErrorBoundaryState {
    hasError: boolean;
    error: Error | null;
}

//Error Boundary to catch errors within children components
class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {

    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error: Error) {
        console.error('Error caught by ErrorBoundary:', error);
        return { hasError: true, error: error };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error('Error caught by ErrorBoundary:', error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            // Turn this on to enable error page params passing
            // return this.props.fallback({ ErrorCode: 401, ErrorMessage: this.state.error?.message || 'An error occurred' });
            // return this.props.fallback;
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
