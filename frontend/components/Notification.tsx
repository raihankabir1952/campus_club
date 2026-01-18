"use client";
import { useEffect, useState } from 'react';
import Pusher from 'pusher-js';

export default function Notification() {
    const [message, setMessage] = useState<string | null>(null);

    useEffect(() => {
        const pusher = new Pusher('ce0131e31a38e14a150f', {
            cluster: 'ap2'
        });

        const channel = pusher.subscribe('member-channel');
        channel.bind('member-added', (data: any) => {
            setMessage(data.message);
            setTimeout(() => {
                setMessage(null);
            }, 9000);
        });

        return () => {
            pusher.unsubscribe('member-channel');
        };
    }, []);

    if (!message) return null;

    return (
        <div style={notificationStyle}>
            <p style={{ margin: 0, fontWeight: 'bold' }}>🔔 new Notification</p>
            <p style={{ margin: '5px 0 0', fontSize: '14px' }}>{message}</p>
        </div>
    );
}

const notificationStyle: React.CSSProperties = {
    position: 'fixed',
    top: '20px',
    right: '20px',
    background: '#2ecc71',
    color: 'white',
    padding: '15px',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
    zIndex: 9999,
    minWidth: '250px',
};
