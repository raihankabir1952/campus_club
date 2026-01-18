import Link from 'next/link';

export default function Header() {
    return (
        <header style={{ padding: '20px', background: '#333', color: '#fff', display: 'flex', justifyContent: 'space-between' }}>
            <h2 style={{ margin: 0 }}>Campus Club</h2>
            <nav>
                <Link href="/login" style={{ margin: '0 10px', color: '#1bc247', textDecoration: 'underline' }}>Login</Link>
                <Link href="/registration" style={{ margin: '0 10px', color: '#4e739a', textDecoration: 'underline' }}>Register</Link>
                </nav>
        </header>
    );
}
