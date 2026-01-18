export default function Loading() {
    return (
        <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            justifyContent: 'center', 
            height: '50vh' 
        }}>
            <div style={spinnerStyle}></div>
            <h2 style={{ color: '#2c3e50', marginTop: '20px' }}>
                Fetching Members Data...
            </h2>
            <p style={{ color: '#7f8c8d' }}>Please wait a moment.</p>
        </div>
    );
}

const spinnerStyle = {
    width: '50px',
    height: '50px',
    border: '5px solid #f3f3f3',
    borderTop: '5px solid #3498db',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
};



