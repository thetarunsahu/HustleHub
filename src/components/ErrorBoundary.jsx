import React from 'react';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        console.error("Uncaught error:", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div style={{
                    padding: '2rem',
                    textAlign: 'center',
                    color: '#fff',
                    background: '#0a0a0a',
                    height: '100vh',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <h2>Something went wrong.</h2>
                    <p style={{ color: '#ef4444', marginBottom: '1rem' }}>
                        {this.state.error?.message || "Unknown Error"}
                    </p>
                    <button
                        onClick={() => window.location.reload()}
                        style={{
                            padding: '0.8rem 1.5rem',
                            background: '#8b5cf6',
                            border: 'none',
                            borderRadius: '8px',
                            color: 'white',
                            cursor: 'pointer'
                        }}
                    >
                        Reload App
                    </button>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
