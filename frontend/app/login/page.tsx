"use client";
import { useState, FormEvent } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Login() 
{
const [credentials, setCredentials] = useState({ email: '', password: '' });
const [error, setError] = useState<string>('');
const router = useRouter();

const handleSubmit = async (e: FormEvent) => {
e.preventDefault();
setError('');
try {
const response = await axios.post('http://localhost:5000/api/member/verify-password', credentials);
if (response.data) {
localStorage.setItem('userEmail', credentials.email);
alert("Login Successful!");
router.push('/dashboard');
}
} catch (err: any) {
setError("Invalid email or password!");
}
};

return (
<div style={{ maxWidth: '400px', margin: '80px auto', padding: '20px', border: '1px solid #ddd', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
<h2 style={{ textAlign: 'center' }}>Member Login</h2>
{error && <p style={{ color: 'white', background: 'red', padding: '10px', borderRadius: '4px', textAlign: 'center' }}>{error}</p>}
<form onSubmit={handleSubmit}>
<label>Email:</label>
<input type="email" style={inputStyle} onChange={(e) => setCredentials({...credentials, email: e.target.value})} required />
<label>Password:</label>
<input type="password" style={inputStyle} onChange={(e) => setCredentials({...credentials, password: e.target.value})} required />
<button type="submit" style={buttonStyle}>Login</button>
</form>
<p style={{ textAlign: 'center', marginTop: '15px' }}>Don't have an account? <Link href="/registration" style={{color: 'blue'}}>Register</Link></p>
</div>
);
}

const inputStyle = { display: 'block', width: '100%', padding: '10px', margin: '10px 0', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box' as const };
const buttonStyle = { width: '100%', padding: '12px', background: '#27ae60', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' as const };
