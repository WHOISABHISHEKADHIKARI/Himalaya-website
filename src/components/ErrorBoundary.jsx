import React from 'react';
import { Link } from 'react-router-dom';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // Replace console.error with proper error tracking
    // Consider using an error tracking service
    this.setState({
      hasError: true,
      error: error
    });
  }

  render() {
    if (this.state.hasError) {
      const isChunkLoadError = this.state.error?.message?.includes('Failed to fetch dynamically imported module');

      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-lg text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {isChunkLoadError ? 'Loading Error' : 'Unexpected Error'}
            </h2>
            <p className="text-gray-600 mb-6">
              {isChunkLoadError
                ? 'We\'re having trouble loading this page. Please check your internet connection and try again.'
                : 'Something went wrong. Please try again later.'}
            </p>
            <div className="space-x-4">
              <button
                onClick={() => window.location.reload()}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                Reload Page
              </button>
              <Link
                to="/"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-green-700 bg-green-100 hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                Go to Homepage
              </Link>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;