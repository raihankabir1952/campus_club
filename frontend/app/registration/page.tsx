"use client";
import { useState, FormEvent } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Register() {
const [formData, setFormData] = useState({
name: '',
email: '',
phone: '',
password: '',
gender: 'male',
dob: ''
});

const [errors, setErrors] = useState<any>({});
const router = useRouter();

const validate = () => {
let newErrors: any = {};

if (!formData.name) newErrors.name = "Name is required";
if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Invalid email address";
if (formData.password.length < 8) newErrors.password = "Password must be at least 8 characters";
if (!/[@#$&]/.test(formData.password)) newErrors.password = "Password must contain @, #, $ or &";
if (!formData.phone) newErrors.phone = "Phone number is required";

setErrors(newErrors);
return Object.keys(newErrors).length === 0;
};

const handleSubmit = async (e: FormEvent) => {
e.preventDefault();

if (validate()) {
const payload: any = { ...formData };

if (payload.dob) {
payload.dob = new Date(payload.dob).toISOString();
} else {
delete payload.dob;
}

//optional chaining
try {
// Axios POST Request
await axios.post('http://localhost:5000/api/member', payload);
alert("Registration Successful!");
router.push('/login');
} catch (err: any) {
const msg = err.response?.data?.message || "Registration failed!";
alert(Array.isArray(msg) ? msg.join(", ") : msg);
}
}
};

return (
<div style={{ maxWidth: '400px', margin: '40px auto', padding: '20px', border: '1px solid #ddd', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
<h2 style={{ textAlign: 'center', color: '#2c3e50' }}>Member Registration</h2>

<form onSubmit={handleSubmit}>
<div style={{ marginBottom: '15px' }}>
<label>Full Name:</label>
<input type="text" style={inputStyle} onChange={(e) => setFormData({...formData, name: e.target.value})} />
{errors.name && <span style={errorStyle}>{errors.name}</span>}
</div>

<div style={{ marginBottom: '15px' }}>
<label>Email Address:</label>
<input type="email" style={inputStyle} onChange={(e) => setFormData({...formData, email: e.target.value})} />
{errors.email && <span style={errorStyle}>{errors.email}</span>}
</div>

<div style={{ marginBottom: '15px' }}>
<label>Phone Number:</label>
<input type="text" style={inputStyle} onChange={(e) => setFormData({...formData, phone: e.target.value})} />
{errors.phone && <span style={errorStyle}>{errors.phone}</span>}
</div>

<div style={{ marginBottom: '15px' }}>
<label>Gender:</label>
<select style={inputStyle} value={formData.gender} onChange={(e) => setFormData({...formData, gender: e.target.value})}>
<option value="male">Male</option>
<option value="female">Female</option>
<option value="other">Other</option>
</select>
</div>

<div style={{ marginBottom: '15px' }}>
<label>Date of Birth:</label>
<input type="date" style={inputStyle} onChange={(e) => setFormData({...formData, dob: e.target.value})} />
</div>

<div style={{ marginBottom: '15px' }}>
<label>Password:</label>
<input type="password" placeholder="At least 8 chars with @#$&" style={inputStyle} onChange={(e) => setFormData({...formData, password: e.target.value})} />
{errors.password && <span style={errorStyle}>{errors.password}</span>}
</div>

<button type="submit" style={buttonStyle}>Register Now</button>
</form>

<p style={{ textAlign: 'center', marginTop: '15px' }}>
Already have an account? <Link href="/login" style={{color: '#3498db', textDecoration: 'none'}}>Login here</Link>
</p>
</div>
);
}

const inputStyle = 
{ display: 'block', width: '100%', padding: '10px', marginTop: '5px', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box' as const };
const buttonStyle = 
{ width: '100%', padding: '12px', background: '#3498db', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' as const, fontSize: '16px' };
const errorStyle = { color: 'red', fontSize: '11px', fontWeight: 'bold' };

