"use client";
import Link from 'next/link';

export default function Unauthorized() {
    return (
        <div style={containerStyle}>
            <div style={cardStyle}>
                <div style={iconStyle}>⚠️</div>
                <h2 style={{ color: '#2c3e50', marginBottom: '15px' }}>Access Denied!</h2>
                <p style={{ color: '#eb0d0d', fontSize: '16px', marginBottom: '25px' }}>
                    Sorry, you must login first to access the Dashboard and member information.
                </p>
                <Link href="/login" style={buttonStyle}>
                    Go to Login
                </Link>
            </div>
        </div>
    );
}

const containerStyle: React.CSSProperties = {
    display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '70vh'
};

const cardStyle: React.CSSProperties = {
    maxWidth: '400px', width: '100%', padding: '40px', textAlign: 'center',
    backgroundColor: '#fff', borderRadius: '12px', boxShadow: '0 10px 25px rgba(0,0,0,0.1)', border: '1px solid #eee'
};

const iconStyle = { fontSize: '50px', marginBottom: '10px' };

const buttonStyle: React.CSSProperties = {
    padding: '12px 30px', backgroundColor: '#029827', color: '#fff',
    textDecoration: 'none', borderRadius: '5px', fontWeight: 'bold', display: 'inline-block'
};
