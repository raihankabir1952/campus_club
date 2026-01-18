"use client";
import Link from 'next/link';

export default function NotFound() {
    return (
        <div style={containerStyle}>
            <div style={cardStyle}>
                <h1 style={errorCodeStyle}>404</h1>
                <h2 style={messageStyle}>Oops! Page Not Found</h2>
                <p style={descriptionStyle}>
                    The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
                </p>
                <Link href="/" style={buttonStyle}>
                    Go Back Home
                </Link>
            </div>
        </div>
    );
}

const containerStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '80vh',
    textAlign: 'center',
    padding: '20px'
};

const cardStyle: React.CSSProperties = {
    maxWidth: '500px',
    padding: '40px',
    borderRadius: '12px',
    backgroundColor: '#fff',
    boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
    border: '1px solid #eee'
};

const errorCodeStyle: React.CSSProperties = {
    fontSize: '80px',
    fontWeight: 'bold',
    color: '#e74c3c',
    margin: '0'
};

const messageStyle: React.CSSProperties = {
    fontSize: '24px',
    color: '#2c3e50',
    margin: '10px 0'
};

const descriptionStyle: React.CSSProperties = {
    fontSize: '16px',
    color: '#7f8c8d',
    marginBottom: '30px',
    lineHeight: '1.6'
};

const buttonStyle: React.CSSProperties = {
    padding: '12px 30px',
    backgroundColor: '#1cb840',
    color: '#fff',
    textDecoration: 'none',
    borderRadius: '5px',
    fontWeight: 'bold',
    transition: 'background 0.3s ease',
    display: 'inline-block'
};
