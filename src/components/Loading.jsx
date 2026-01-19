const Loading = () => (
    <div style={{
        height: '100vh',
        width: '100vw',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: '#0a0a0a',
        color: '#8b5cf6',
        flexDirection: 'column',
        gap: '1rem'
    }}>
        <div className="spinner" style={{
            width: '40px',
            height: '40px',
            border: '4px solid rgba(139, 92, 246, 0.3)',
            borderTop: '4px solid #8b5cf6',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite'
        }}></div>
        <p>Loading HustleHub...</p>
        <style>{`
      @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
    `}</style>
    </div>
);

export default Loading;
