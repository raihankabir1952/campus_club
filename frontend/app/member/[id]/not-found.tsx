export default function NotFound() {
    return (
        <div style={{ textAlign: 'center', marginTop: '100px' }}>
            <h1 style={{ color: 'red' }}>404 - Member Not Found</h1>
            <p>The member you are looking for does not exist in our database.</p>
            <a href="/dashboard" style={{ color: 'blue', textDecoration: 'underline' }}>Return to Dashboard</a>
        </div>
    );
}
