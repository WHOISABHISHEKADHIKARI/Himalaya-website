import React from 'react';
import { Link } from 'react-router-dom';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      hasError: false, 
      error: null,
      retryCount: 0,
      isOffline: !navigator.onLine
    };
    this.resetErrorBoundary = this.resetErrorBoundary.bind(this);
  }

  componentDidMount() {
    window.addEventListener('online', this.handleNetworkChange);
    window.addEventListener('offline', this.handleNetworkChange);
  }

  componentWillUnmount() {
    window.removeEventListener('online', this.handleNetworkChange);
    window.removeEventListener('offline', this.handleNetworkChange);
  }

  handleNetworkChange = () => {
    this.setState({ isOffline: !navigator.onLine });
  }

  resetErrorBoundary() {
    if (this.state.retryCount >= 3) {
      window.location.reload(); // Hard reload after 3 retries
      return;
    }
    this.setState(prevState => ({
      hasError: false,
      error: null,
      retryCount: prevState.retryCount + 1
    }));
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // Log error to your preferred error tracking service
    console.error('Error caught by boundary:', error, errorInfo);
    
    this.setState({
      hasError: true,
      error: error
    });
  }

  componentDidUpdate(prevProps) {
    if (this.state.hasError) {
      // Reset error state when location changes
      if (window.location.pathname !== prevProps.location?.pathname) {
        this.resetErrorBoundary();
      }
    }
  }

  render() {
    if (this.state.hasError) {
      const isChunkLoadError = this.state.error?.message?.includes('Failed to fetch dynamically imported module');

      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-lg text-center">
            <div className="mb-6">
              <svg className="mx-auto h-16 w-16 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {isChunkLoadError ? 'Loading Error' : 'Unexpected Error'}
            </h2>
            <p className="text-gray-600 mb-3">
              {this.state.isOffline
                ? 'You appear to be offline. Please check your internet connection.'
                : isChunkLoadError
                ? 'We\'re having trouble loading this page. Please check your internet connection and try again.'
                : 'Something went wrong. Please try again later.'}
            </p>
            <div className="text-sm text-gray-500 mb-6 space-y-1">
              <p>Error Code: {this.state.error?.name || 'Unknown'}</p>
              {this.state.retryCount > 0 && (
                <p>Retry Attempt: {this.state.retryCount}/3</p>
              )}
              <p>Network Status: {this.state.isOffline ? 'Offline' : 'Online'}</p>
            </div>
            <div className="space-x-4">
              <button
                onClick={this.resetErrorBoundary}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={this.state.isOffline || this.state.retryCount >= 3}
              >
                {this.state.retryCount >= 3 ? 'Reloading...' : 'Try Again'}
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